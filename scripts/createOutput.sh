BASEDIR=$(dirname "$0")
cd $BASEDIR/../

body='</body>'
bodyRep='<script src="index.js"></script></body>';
sed -i "s#$body#$bodyRep#" "target/generated-docs/index.html";

head='</head>'
headRep='<link rel="stylesheet" href="index.css"></head>';
sed -i "s#$head#$headRep#" "target/generated-docs/index.html";
