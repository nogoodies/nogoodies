#!/bin/bash

# only deploy from master
git checkout master

REVISION=`git rev-parse HEAD`
./gradlew build -Pprod bootjar

if ! git remote | grep -q clever; then
  echo "Adding clever-cloud GIT remote"
  git remote add clever git+ssh://git@push-par-clevercloud-customers.services.clever-cloud.com/app_46e1c372-b389-43b7-8c0f-ff83ca66f700.git
fi

JAR="nogoodies.jar" 
jar=`ls build/libs/nogoodies-*.jar | head -1`
cp -f "$jar" $JAR.$REVISION

CLEVER_BRANCH="clever_deploy"
if git checkout $CLEVER_BRANCH; then
  mv $JAR.$REVISION $JAR
  git add $JAR
  git commit -m "deployment of $REVISION"
  git push --set-upstream clever $CLEVER_BRANCH:master

  git checkout master
fi
