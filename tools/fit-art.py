#!/usr/bin/env python3
"""Trim, shrink and optimise a picture for the game.
Usage: python3 tools/fit-art.py assets/incoming/cat.png assets/cat.png [max=128]"""
import os, sys
try:
    from PIL import Image, ImageDraw
except ImportError:
    sys.exit("Pillow is missing: pip install Pillow")

def main(a):
    if len(a) < 2 or len(a) > 3:
        sys.exit(__doc__)
    src, dst = a[0], a[1]
    try:
        mx = int(a[2]) if len(a) > 2 else 128
        if mx < 1: raise ValueError
    except ValueError:
        sys.exit("max must be a whole number like 128")
    if not os.path.isfile(src):
        sys.exit("Cannot find file: " + src)
    try:
        im = Image.open(src).convert("RGBA")
    except Exception as e:
        sys.exit("Cannot read %s as a picture: %s" % (src, e))
    if im.getchannel("A").getextrema()[0] == 255:  # no transparency: clear the white background from the corners
        w, h = im.size
        for c in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
            if sum(im.getpixel(c)[:3]) >= 3 * 235:
                ImageDraw.floodfill(im, c, (255, 255, 255, 0), thresh=40)
    box = im.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    if not box:
        sys.exit("Nothing left after clearing the background: " + src)
    im = im.crop(box)
    r = mx / max(im.size)
    im = im.resize((max(1, round(im.width * r)), max(1, round(im.height * r))), Image.LANCZOS)
    os.makedirs(os.path.dirname(os.path.abspath(dst)), exist_ok=True)
    im.save(dst, "PNG", optimize=True)
    print("%s: %dx%d, %d bytes" % (dst, im.width, im.height, os.path.getsize(dst)))

main(sys.argv[1:])
