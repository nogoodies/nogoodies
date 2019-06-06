#!/bin/bash

# only deploy from master
git checkout master

REVISION=`git rev-parse HEAD`
./gradlew build -Pprod bootjar

CLEVER_REMOTE="clever"
CLEVER_BRANCH="clever_deploy"
if ! git remote | grep -q $CLEVER_REMOTE; then
  echo "Adding clever-cloud GIT remote"
  git remote add $CLEVER_REMOTE git+ssh://git@push-par-clevercloud-customers.services.clever-cloud.com/app_46e1c372-b389-43b7-8c0f-ff83ca66f700.git
  git fetch $CLEVER_REMOTE
fi


JAR="nogoodies.jar" 
jar=`ls build/libs/nogoodies-*.jar | head -1`
cp -f "$jar" $JAR.$REVISION

if ! git branch | grep -q $CLEVER_BRANCH; then
  git checkout -b $CLEVER_BRANCH $CLEVER_REMOTE/master
else
  git checkout $CLEVER_BRANCH
  git pull
fi

mv $JAR.$REVISION $JAR
git pull
git add $JAR
git commit -m "deployment of $REVISION"
git push --set-upstream clever $CLEVER_BRANCH:master

git checkout master
