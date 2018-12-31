#!/bin/sh
# wait-for-postgres.sh

set -e

host="$1"
shift
cmd="$@"
# psql -U <username> -d <database> -h <hostname>
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U $POSTGRES_USER -d $POSTGRES_DB -c '\q'; do
  >&2 echo "Postgres - $POSTGRES_DB is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres - $POSTGRES_DB is up - executing command"
exec $cmd