const fs = require('fs');
const path = require('path');

const package_json_path = path.resolve(__dirname, '../package.json');
const parent_path = path.resolve(__dirname, '..'); // nodstarter folder inside node_modules
const project_path = path.resolve(__dirname, '../../../'); // user project folder
const script_path = project_path + "/scripts";

let programmer_package_json = require(project_path+'/package.json')

let updatePackageJson = function(){
	const json_content = fs.readFileSync(package_json_path, 'utf8');
	let pjson = JSON.parse(json_content);

	pjson.description = programmer_package_json.description || '';
	pjson.name = programmer_package_json.name || '';
	pjson.author = programmer_package_json.author || '';
	pjson.version = programmer_package_json.version || '';
	pjson.repository = programmer_package_json.repository || '';
	pjson.license = programmer_package_json.license || 'ISC';
    pjson.bugs = '';
	pjson.homepage = '';

	delete pjson.scripts.postinstall;
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

	fs.writeFileSync(package_json_path, JSON.stringify(pjson, null, 4), 'utf8');
};

let mkdir = function(dir) {
	try {
		fs.mkdirSync(dir, 0755);
	} catch(err) {
		if(err.code != "EEXIST") {
			throw e;
		}
	}
};

let rmDirRecursive = function(dir) {
	if (fs.existsSync(dir)) {
		let list = fs.readdirSync(dir);
		for(let i = 0; i < list.length; i++) {
			let filename = path.join(dir, list[i]);
			let stat = fs.lstatSync(filename);
			if(filename == "." || filename == "..") {
			} else if(stat.isDirectory()) {
				rmDirRecursive(filename);
			} else {
				fs.unlinkSync(filename);
			}
		}
		try{
			fs.rmdirSync(dir);
		}catch(err){
			console.log(err);
		}
	} else {
		console.warn("Warn: " + dir + " not exists");
	}
};

let copyDirRecursive = function(src, dest) {
	mkdir(dest);
	let files = fs.readdirSync(src);
	for(let i = 0; i < files.length; i++) {
		let current = fs.lstatSync(path.join(src, files[i]));
		if(current.isDirectory()) {
			copyDirRecursive(path.join(src, files[i]), path.join(dest, files[i]));
		} else if(current.isSymbolicLink()) {
			let symlink = fs.readlinkSync(path.join(src, files[i]));
			fs.symlinkSync(symlink, path.join(dest, files[i]));
		} else {
			copyFile(path.join(src, files[i]), path.join(dest, files[i]));
		}
	}
};

let copyFile = function(src, dest) {
	fs.createReadStream(src).pipe(fs.createWriteStream(dest));
};

copyDirRecursive(parent_path, project_path);

updatePackageJson();

rmDirRecursive(parent_path);

rmDirRecursive(script_path);
