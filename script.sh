#!/usr/bin/env bash

get_encrypted_password(){
  /usr/local/bin/node $(directory)/run/bcrypt/index.js $1 $2 $3
}