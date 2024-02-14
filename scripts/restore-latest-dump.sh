#!/bin/bash

# Find the latest .sql file in the parent directory
latest_sql=$(ls -t ../dumps/*.sql | head -1)

# Check if a .sql file was found
if [ -z "$latest_sql" ]; then
  echo "No .sql files found in directory"
  exit 1
fi

# Run the docker exec command to drop and restore the postgres dump

docker exec -i DEV_GLIDRR_POSTGRES psql -U postgres -c 'DROP DATABASE "DEV_GLIDRR_POSTGRESS" WITH(force);'

docker exec -i DEV_GLIDRR_POSTGRES psql -U postgres -c 'CREATE DATABASE "DEV_GLIDRR_POSTGRESS";'

docker exec -i DEV_GLIDRR_POSTGRES psql -U postgres "DEV_GLIDRR_POSTGRESS" < ../dumps/$latest_sql