#!/bin/sh

rm -rf ../minidapp

mkdir ../minidapp

mkdir ../minidapp/CoinMasterPro

cp -rf www/* ../minidapp/CoinMasterPro

cp src/assets/bg.svg ../minidapp/CoinMasterPro

cp src/assets/minidapp.conf.orig ../minidapp/CoinMasterPro/minidapp.conf

zip -r ../minidapp/coinmasterpro.minidapp ../minidapp/CoinMasterPro


