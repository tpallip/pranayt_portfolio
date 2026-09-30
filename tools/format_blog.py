#!/usr/bin/env python3
"""Reflow <p> and <li> text in blog/*.html into evenly filled blocks.

Every paragraph/list item whose text doesn't fit on one line is rewritten as:

    <p>
      text filled greedily up to WIDTH columns ...
    </p>

Inline tags (<em>, <a href="...">, ...) are never split across lines.

Usage:
    python3 tools/format_blog.py            # format all blog/*.html in place
    python3 tools/format_blog.py --check    # exit 1 if anything would change
    python3 tools/format_blog.py FILE ...   # format specific files
"""
import re
import sys
from pathlib import Path

WIDTH = 100
BLOCK_TAGS = ("p", "li")
BLOG_DIR = Path(__file__).resolve().parent.parent / "blog"

OPEN_RE = re.compile(r"^(\s*)<(%s)(\s[^>]*)?>(.*)$" % "|".join(BLOCK_TAGS))
# whitespace-separated words, treating each <...> tag as unbreakable
TOKEN_RE = re.compile(r"(?:<[^>]*>|[^\s<])+")


def wrap(text, indent):
    words = TOKEN_RE.findall(text)
    lines, cur = [], indent
    for w in words:
        if cur.strip() and len(cur) + 1 + len(w) > WIDTH:
            lines.append(cur)
            cur = indent + w
        else:
            cur = cur + (" " if cur.strip() else "") + w
    if cur.strip():
        lines.append(cur)
    return lines


def format_html(src):
    lines = src.split("\n")
    out, i = [], 0
    while i < len(lines):
        m = OPEN_RE.match(lines[i])
        if not m:
            out.append(lines[i])
            i += 1
            continue
        indent, tag, attrs, rest = m.group(1), m.group(2), m.group(3) or "", m.group(4)
        close = "</%s>" % tag
        # collect everything up to the matching close tag
        body, j = [rest], i
        while close not in body[-1] and j + 1 < len(lines):
            j += 1
            body.append(lines[j])
        joined = " ".join(body)
        if close not in joined or ("<%s" % tag) in joined.split(close)[0]:
            # unclosed or nested (e.g. <li> containing a list) -- leave untouched
            out.append(lines[i])
            i += 1
            continue
        inner, trailing = joined.split(close, 1)
        inner = " ".join(inner.split())
        opener = "%s<%s%s>" % (indent, tag, attrs)
        one_line = "%s%s%s" % (opener, inner, close)
        if len(one_line) <= WIDTH:
            out.append(one_line)
        else:
            out.append(opener)
            out.extend(wrap(inner, indent + "  "))
            out.append(indent + close)
        if trailing.strip():
            out.append(indent + trailing.strip())
        i = j + 1
    # strip trailing whitespace on every line
    return "\n".join(l.rstrip() for l in out)


def main(argv):
    check = "--check" in argv
    files = [Path(a) for a in argv if a != "--check"] or sorted(BLOG_DIR.glob("*.html"))
    changed = []
    for f in files:
        src = f.read_text()
        new = format_html(src)
        if new != src:
            changed.append(f)
            if not check:
                f.write_text(new)
    for f in changed:
        print(("would reformat " if check else "reformatted ") + str(f))
    return 1 if check and changed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
