#!/bin/bash

echo "🚀 Fast Loading Optimization - Thumbnails + FULL_SIZE..."

# Check if imagemagick is installed
if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
    echo "Installing ImageMagick..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install imagemagick
    else
        sudo apt-get update && sudo apt-get install -y imagemagick
    fi
fi

# Create backup
timestamp=$(date +%Y%m%d_%H%M%S)
backup_dir="gallery_backup_${timestamp}"
echo "📂 Creating backup: $backup_dir"
mkdir -p "$backup_dir"
cp -r public/images/gallery "$backup_dir/"

# Create thumbnails directory
mkdir -p public/images/gallery/thumbnails

echo "Original sizes:"
echo "  Gallery: $(du -sh public/images/gallery | cut -f1)"
echo "  FULL_SIZE: $(du -sh public/images/gallery/FULL_SIZE | cut -f1)"

# Function to create small thumbnails from main gallery
create_thumbnails() {
    echo ""
    echo "🖼️  Creating small thumbnails for gallery grid..."
    
    local count=$(find public/images/gallery -maxdepth 1 -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | wc -l)
    local current=0
    
    find public/images/gallery -maxdepth 1 -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | while read file; do
        current=$((current + 1))
        local basename=$(basename "$file" | sed 's/\.[^.]*$//')
        
        echo "[$current/$count] Creating thumbnail: $basename"
        
        # Create 250px width thumbnail with high compression for fast loading
        if command -v magick &> /dev/null; then
            magick "$file" -resize '1000x1000>' -quality 70 -strip "public/images/gallery/thumbnails/${basename}.jpg"
        else
            convert "$file" -resize '1000x1000>' -quality 70 -strip "public/images/gallery/thumbnails/${basename}.jpg"
        fi
        
        # Show size comparison
        original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        thumb_size=$(stat -f%z "public/images/gallery/thumbnails/${basename}.jpg" 2>/dev/null || stat -c%s "public/images/gallery/thumbnails/${basename}.jpg" 2>/dev/null)
        echo "  $((original_size/1024))KB → $((thumb_size/1024))KB ($(((original_size-thumb_size)*100/original_size))% smaller)"
    done
}

# Function to aggressively optimize FULL_SIZE for faster loading
optimize_fullsize() {
    echo ""
    echo "🔧 Optimizing FULL_SIZE for faster loading..."
    
    local count=$(find public/images/gallery/FULL_SIZE -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | wc -l)
    local current=0
    
    find public/images/gallery/FULL_SIZE -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | while read file; do
        current=$((current + 1))
        echo "[$current/$count] Optimizing: $(basename "$file")"
        
        # Get original size
        original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        
        # Aggressive optimization: max 1920px, 70% quality for fast loading
        if command -v magick &> /dev/null; then
            magick "$file" -resize '1920x1920>' -quality 70 -strip "${file}.tmp"
        else
            convert "$file" -resize '1920x1920>' -quality 70 -strip "${file}.tmp"
        fi
        
        # Replace original with optimized
        mv "${file}.tmp" "$file"
        
        # Show savings
        new_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        if [ "$original_size" -gt 0 ]; then
            savings=$((original_size - new_size))
            percent=$((savings * 100 / original_size))
            echo "  Reduced: $((savings/1024/1024))MB (${percent}%)"
        fi
    done
}

# Run optimizations
create_thumbnails
optimize_fullsize

echo ""
echo "✅ Fast loading optimization complete!"
echo ""
echo "📊 Results:"
echo "  📁 Original gallery: $(du -sh public/images/gallery | cut -f1)"
echo "  🖼️  Thumbnails: $(du -sh public/images/gallery/thumbnails | cut -f1)"
echo "  📸 FULL_SIZE: $(du -sh public/images/gallery/FULL_SIZE | cut -f1)"

# Calculate average thumbnail size
if [ -d "public/images/gallery/thumbnails" ]; then
    thumb_count=$(find public/images/gallery/thumbnails -name "*.jpg" | wc -l)
    thumb_total=$(du -sk public/images/gallery/thumbnails | cut -f1)
    if [ "$thumb_count" -gt 0 ]; then
        avg_thumb=$((thumb_total / thumb_count))
        echo "  📈 Average thumbnail: ${avg_thumb}KB (super fast!)"
    fi
fi

echo ""
echo "📂 Backup: $backup_dir"
echo "🚀 Ready to SCP to server!" 