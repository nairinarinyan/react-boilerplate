#!/usr/bin/env node

import { join } from 'path';
import { copy, mkdir, writeFile, readFile, rename } from 'fs-extra';
import { exec } from 'child_process';
import ora from 'ora';

const filesToReplaceIn = [
    'package.json',
    'Dockerfile',
    'src/index.html'
];

const filesToRename = [
    'conf/rename_this.conf',
];

const copySource = async (appName: string, appDir: string) => {
    const sourceDir = join(__dirname, 'source');

    return copy(sourceDir, appDir, {
        filter(src: string, dest: string) {
            return !~src.indexOf('source/node_modules');
        }
    });
};

const renameGitignore = async (appDir: string) => {
    const sourcePath = join(appDir, '_.gitignore');
    const targetPath = join(appDir, '.gitignore');
    return rename(sourcePath, targetPath);
};

const replaceNameInFiles = async (appName: string, appDir: string) => {
    const replacePromises = filesToReplaceIn.map(async fileName => {
        const filePath = join(appDir, fileName);
        const fileContent = await readFile(filePath, 'utf-8');
        const replacedContent = fileContent.replace('rename_this', appName);
        return writeFile(filePath, replacedContent);
    });

    const renamePromises = filesToRename.map(fileName => {
        const filePath = join(appDir, fileName);
        const newPath = filePath.replace('rename_this', appName);
        return rename(filePath, newPath);
    })

    return Promise.all(replacePromises.concat(renamePromises));
};

const installDeps = (appDir: string) => {
    process.chdir(appDir);

    return new Promise((resolve, reject) => {
        exec('npm i', (err, stdout, stderr) => {
            if (err || /err/i.test(stderr)) {
                return reject(err);
            }

            resolve(stdout);
        });
    });
};

const run = async (appName: string) => {
    if (!appName) {
        console.error('Specify an app name plz');
        process.exit(1);
    }

    const parentDir = process.cwd();
    const appDir = join(parentDir, appName);

    const dirSpinner = ora('Creating the directory...');
    const copySpinner = ora('Copying the source files...');
    const renameSpinner = ora('Writing project name...');
    const depsSpinner = ora('Installing dependencies...');

    try {
        dirSpinner.start();
        await mkdir(appDir);
        dirSpinner.text = 'Directory done';
        dirSpinner.succeed();
    } catch (err) {
        dirSpinner.text = 'Unable to create a directory for your app';
        dirSpinner.fail();
        console.error(err);
        process.exit(1);
    }

    try {
        copySpinner.start();
        await copySource(appName, appDir);
        copySpinner.text = 'Source files copied';
        copySpinner.succeed();
    } catch (err) {
        copySpinner.text = 'Unable to copy source files';
        copySpinner.fail();
        console.error(err);
        process.exit(1);
    }

    try {
        renameSpinner.start();
        await replaceNameInFiles(appName, appDir);
        await renameGitignore(appDir);
        renameSpinner.text = 'Project name set'
        renameSpinner.succeed();
    } catch (err) {
        renameSpinner.text = 'Unable replace the name'
        renameSpinner.fail();
        console.error(err);
        process.exit(1);
    }

    try {
        depsSpinner.start();
        await installDeps(appDir);
        depsSpinner.text = 'Dependencies installed';
        depsSpinner.succeed();
    } catch (err) {
        depsSpinner.text = 'Unable to install the dependencies';
        depsSpinner.fail();
        console.error(err);
        process.exit(1);
    }

    console.log('All set!');
};

run(process.argv[2]);