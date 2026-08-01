"""Rewrites the resume PDF's metadata, run by build-resume.ps1.

    python resume-postprocess.py public/Yashwanth-D-Resume.pdf

Edge records HeadlessChrome as Creator and Skia/PDF as Producer, along with
build timestamps. This replaces all of it.
"""

import os
import sys

from pypdf import PdfReader, PdfWriter

META = {
    "/Title": "Yashwanth D Resume",
    "/Author": "Yashwanth D",
    "/Subject": "Resume",
    "/Keywords": (
        "AI Engineer, Backend Engineer, Full Stack Engineer, RAG, "
        "Multi-Agent Systems, LangGraph, FastAPI, Laravel, React, Next.js"
    ),
    "/Creator": "Yashwanth D",
    "/Producer": "Yashwanth D",
}


def clean(path):
    tmp = path + ".tmp"
    writer = PdfWriter()
    writer.append_pages_from_reader(PdfReader(path))
    writer.add_metadata(META)
    with open(tmp, "wb") as f:
        writer.write(f)
    os.replace(tmp, path)
    return len(PdfReader(path).pages)


if __name__ == "__main__":
    print("pdf pages:", clean(sys.argv[1]))
