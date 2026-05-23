import { Project } from 'ts-morph';
import * as path from 'path';

const project = new Project({
	tsConfigFilePath: 'tsconfig.json'
});

project.addSourceFilesAtPaths('src/**/*.{ts,tsx}');

const files = project.getSourceFiles();

const sharedUIDirectory = project.getDirectory(
	path.resolve(__dirname, '..', 'src', 'shared', 'ui')
);

const componentsDirs = sharedUIDirectory?.getDirectories();

componentsDirs?.forEach(directory => {
	const indexFile = directory.getSourceFile('index.ts');

	if (!indexFile) {
		const sourceCode = `export * from './${directory.getBaseName()}';`;

		directory.createSourceFile('index.ts', sourceCode, { overwrite: true });
	}
});

function isAbsolute(value: string) {
	const layers = ['app', 'widgets', 'shared', 'entities', 'features', 'pages'];

	return layers.some(layer => value.startsWith(layer));
}

files.forEach(sourceFile => {
	const importDeclarations = sourceFile.getImportDeclarations();

	importDeclarations.forEach(importDeclaration => {
		const value = importDeclaration.getModuleSpecifierValue();

		const valueWithoutAlias = value.replace('@/', '');

		const segments = valueWithoutAlias.split('/');

		const isSharedLayer = segments[0] === 'shared';
		const isUISlice = segments[1] === 'ui';

		if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUISlice) {
			const [layer, slice, component] = segments;

			const result = `${layer}/${slice}/${component}`;

			importDeclaration.setModuleSpecifier(`@/${result}`);

			console.log(`Updated: ${value} -> @/${result}`);
		}
	});
});

async function main() {
	await project.save();

	console.log('DONE');
}

main();
