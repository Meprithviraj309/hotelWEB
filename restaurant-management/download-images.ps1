$imageUrls = @{
    "restaurant-bg.jpg" = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
    "pasta.jpg" = "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80"
    "salmon.jpg" = "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80"
    "burger.jpg" = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"
    "salad.jpg" = "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80"
}

$assetsDir = "src\assets"
if (-not (Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Path $assetsDir
}

foreach ($image in $imageUrls.GetEnumerator()) {
    $outputPath = Join-Path $assetsDir $image.Key
    Invoke-WebRequest -Uri $image.Value -OutFile $outputPath
    Write-Host "Downloaded $($image.Key)"
} 