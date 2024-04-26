#!/bin/bash

keytool -genkeypair -v -storetype PKCS12 -keystore sparkle-release-key.keystore -alias sparkle -keyalg RSA -keysize 2048 -validity 10000
