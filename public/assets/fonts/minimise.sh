#!/bin/sh

fs="$1"
for f in ${fs}
do
  pyftsubset $f --text-file=chars.txt --layout-features='palt','ruby','hkna','ccmp','liga','kern','clig','calt' --no-hinting --desubroutinize --hinting-tables='*' --flavor=woff2 --output-file=${f%.*}.min.woff2
done