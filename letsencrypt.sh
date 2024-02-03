#!/bin/sh

mkdir -p build/.well-known/acme-challenge
cp ./challenge-content.txt ./build/.well-known/acme-challenge/blah.txt