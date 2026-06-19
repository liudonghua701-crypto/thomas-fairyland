param(
  [Parameter(Mandatory = $true)]
  [string]$InputPath,

  [Parameter(Mandatory = $true)]
  [string]$OutputName,

  [int]$MaxEdge = 2000,
  [int]$Quality = 85
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$source = (Resolve-Path -LiteralPath $InputPath).Path
$safeName = [System.IO.Path]::GetFileNameWithoutExtension($OutputName)
$destinationDirectory = Join-Path (Split-Path $PSScriptRoot -Parent) "assets\photos"
$destination = Join-Path $destinationDirectory ($safeName + ".jpg")
New-Item -ItemType Directory -Force -Path $destinationDirectory | Out-Null

$image = [System.Drawing.Image]::FromFile($source)
try {
  $scale = [Math]::Min(1.0, $MaxEdge / [double][Math]::Max($image.Width, $image.Height))
  $width = [Math]::Max(1, [int][Math]::Round($image.Width * $scale))
  $height = [Math]::Max(1, [int][Math]::Round($image.Height * $scale))
  $bitmap = New-Object System.Drawing.Bitmap($width, $height)
  try {
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $graphics.DrawImage($image, 0, 0, $width, $height)
    } finally {
      $graphics.Dispose()
    }

    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
      Where-Object { $_.MimeType -eq "image/jpeg" }
    $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
      [System.Drawing.Imaging.Encoder]::Quality,
      [long][Math]::Max(1, [Math]::Min(100, $Quality))
    )
    $bitmap.Save($destination, $encoder, $parameters)
  } finally {
    $bitmap.Dispose()
  }
} finally {
  $image.Dispose()
}

$file = Get-Item -LiteralPath $destination
Write-Host "Created: $($file.FullName)"
Write-Host "Size: $width x $height, $([Math]::Round($file.Length / 1KB)) KB"
