#!/bin/sh

echo hello \
&& tsc --outDir parser_exp/out parser_exp/test.ts \
&& mv parser_exp/out/test.js parser_exp/out/test.cjs \
&& node parser_exp/out/test.cjs
