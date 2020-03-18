const fs = require('fs');
const path = require('path');

const package_path = path.resolve(__dirname, '../package.json');
const parent_path = path.resolve(__dirname, '..');
const project_path = path.resolve(__dirname, '../../../');
const script_path = project_path + "/scripts";

var updatePackageJson = function(){
	const json_content = fs.readFileSync(package_path, 'utf8');
	var pjson = JSON.parse(json_content);
	
	pjson.scripts.postinstall = '';
	pjson.description = '';
	pjson.name = 'api_starter';
	pjson.author = '';
	pjson.version = '1.0.0';
	pjson.repository = '';
	pjson.bugs = '';
	pjson.homepage = '';
	
	delete pjson._resolved;
	delete pjson._shasum;
	delete pjson._spec;
	delete pjson._where;
	delete pjson._requiredBy;
	delete pjson._requested;
	delete pjson._phantomChildren;
	delete pjson._location;
	delete pjson._integrity;
	delete pjson._inBundle;
	delete pjson._from;
	delete pjson._id;

	fs.writeFileSync(package_path, JSON.stringify(pjson, null, 4), 'utf8');
};

var mkdir = function(dir) {
	try {
		fs.mkdirSync(dir, 0755);
	} catch(err) {
		if(err.code != "EEXIST") {
			throw e;
		}
	}
};

var rmdir = function(dir) {
	if (fs.existsSync(dir)) {
		var list = fs.readdirSync(dir);
		for(var i = 0; i < list.length; i++) {
			var filename = path.join(dir, list[i]);
			var stat = fs.lstatSync(filename);
			if(filename == "." || filename == "..") {
			} else if(stat.isDirectory()) {
				rmdir(filename);
			} else {
				fs.unlinkSync(filename);
			}
		}
		fs.rmdirSync(dir);
	} else {
		console.warn("warn: " + dir + " not exists");
	}
};

var copyDir = function(src, dest) {
	mkdir(dest);
	var files = fs.readdirSync(src);
	for(var i = 0; i < files.length; i++) {
		var current = fs.lstatSync(path.join(src, files[i]));
		if(current.isDirectory()) {
			copyDir(path.join(src, files[i]), path.join(dest, files[i]));
		} else if(current.isSymbolicLink()) {
			var symlink = fs.readlinkSync(path.join(src, files[i]));
			fs.symlinkSync(symlink, path.join(dest, files[i]));
		} else {
			copy(path.join(src, files[i]), path.join(dest, files[i]));
		}
	}
};

var copy = function(src, dest) {
	fs.createReadStream(src).pipe(fs.createWriteStream(dest))
};

copyDir(parent_path, project_path);

updatePackageJson()

rmdir(parent_path);

rmdir(script_path);
