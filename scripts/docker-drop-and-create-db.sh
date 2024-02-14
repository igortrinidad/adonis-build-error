#!/bin/bash

docker exec -i DEV_CAPACITHOR_POSTGRES psql -U postgres -c 'DROP DATABASE "DEV_CAPACITHOR_POSTGRES" WITH(force);'

docker exec -i DEV_CAPACITHOR_POSTGRES psql -U postgres -c 'CREATE DATABASE "DEV_CAPACITHOR_POSTGRES";'
