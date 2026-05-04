import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.{ts,tsx}');

const files = project.getSourceFiles();

function isAbsolute(value: string) {
	const layers = ['app', 'widgets', 'shared', 'entities', 'features', 'pages'];
	return layers.some(layer => value.startsWith(layer));
}

files.forEach(sourceFile => {
	const importDeclarations = sourceFile.getImportDeclarations();

	importDeclarations.forEach(importDeclaration => {
		const value = importDeclaration.getModuleSpecifierValue();

		if (isAbsolute(value) && !value.startsWith('@/')) {
			importDeclaration.setModuleSpecifier(`@/${value}`);
			console.log(`Updated: ${value} -> @/${value}`);
		}
	});
});
async function main() {
	await project.save();
	console.log('DONE');
}

main();
