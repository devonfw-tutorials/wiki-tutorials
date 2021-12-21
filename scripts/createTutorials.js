const fs = require('fs');
const path = require('path');
var parser = require('./parser');


function main(tutorialsDir, outputFile, snippetLength) {
    
    var tutorials = {};

    let dirContent = fs.readdirSync(tutorialsDir);

    
    dirContent.forEach(function (dirItem) {

        item = `${tutorialsDir}/${dirItem}`;
        fileStats = fs.lstatSync(item);

        if (!fileStats.isFile()) {
            var indexAsciidocPath = path.join("./", item, "index.asciidoc");

            if (fs.existsSync(indexAsciidocPath)) {

                var result = new parser.Parser().parse(indexAsciidocPath); 

                var title = result.title;
                var subtitle =result.subtitle;
                var description = result.description;

                tutorials[dirItem] = {
                    title: title,
                    subtitle: subtitle,
                    description, description
                }
            }
        }
    });
    console.log(tutorials);
    fs.writeFileSync(path.join("./", outputFile), JSON.stringify(tutorials));
}


if (process.argv.length > 3) {

    main(process.argv[2], process.argv[3], process.argv[4]);
}