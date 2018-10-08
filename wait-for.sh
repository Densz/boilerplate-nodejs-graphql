#!/bin/sh
# wait-for-postgres.sh

set -e

host="$1"
shift
cmd="$@"
# psql -U <username> -d <database> -h <hostname>
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "root" -d "boilerplate" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd