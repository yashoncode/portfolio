# Builds public/Yashwanth-D-Resume.pdf from resume-source.html.
# Run from anywhere:  powershell -ExecutionPolicy Bypass -File build-resume.ps1

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$src  = Join-Path $root "resume-source.html"
$pdf  = Join-Path $root "public\Yashwanth-D-Resume.pdf"

# The throwaway profile matters: reusing the default one serves a cached copy
# of resume-source.html and silently prints the previous version.
$edgeProfile = Join-Path $env:TEMP "edge-resume-$(Get-Random)"
$startedAt = Get-Date
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" `
  --headless=new --disable-gpu --no-pdf-header-footer `
  --user-data-dir="$edgeProfile" --print-to-pdf="$pdf" "$src"

# Edge hands control back before it has finished writing the file. Without
# this wait the metadata scrub below runs against the PREVIOUS pdf, and Edge
# then overwrites it, leaving HeadlessChrome/Skia in the shipped file.
$deadline = (Get-Date).AddSeconds(90)
do {
  Start-Sleep -Milliseconds 300
  $written = (Test-Path $pdf) -and ((Get-Item $pdf).LastWriteTime -gt $startedAt)
  if ($written) {
    try { $fs = [IO.File]::Open($pdf, 'Open', 'Read', 'None'); $fs.Close() }
    catch { $written = $false }
  }
} until ($written -or (Get-Date) -gt $deadline)
if (-not $written) { throw "Edge did not finish writing $pdf" }

Remove-Item -Recurse -Force $edgeProfile -ErrorAction SilentlyContinue
python (Join-Path $root "resume-postprocess.py") $pdf

"built: $pdf"
