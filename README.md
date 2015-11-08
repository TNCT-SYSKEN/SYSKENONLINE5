# SYSKEN ONLINE ver.5

[![Build Status](https://travis-ci.org/TNCT-SYSKEN/SYSKENONLINE5.svg?branch=master)](https://travis-ci.org/TNCT-SYSKEN/SYSKENONLINE5)
[![devDependency Status](https://david-dm.org/TNCT-SYSKEN/SYSKENONLINE5/dev-status.svg)](https://david-dm.org/TNCT-SYSKEN/SYSKENONLINE5#info=devDependencies)

このリポジトリは[SYSKEN ONLINE](http://sysken.org/)のWordPressテーマを管理しているリポジトリです。

(そのうちフロントエンド開発のオレオレテンプレートにもなるはず)

## Plan

実装させる予定の機能

 * デザインの変更
 * レスポンシブレイアウトによるスマートフォン対応
 * タスクランナーによるアセットファイルの自動生成
 * 中退フラグの実装


## How to build (Draft)

このリポジトリを健全に使用するためには以下のライブラリが必要です。

 * Node.js
   * Grunt
   * Bower
 * Ruby
   * Bundler
   * Sass
   * scss-lint

### Node.js

#### Node.js 本体のインストール

 * [Node.js](https://nodejs.org/en/) - v4.2.2

基本的には上記のページからインストーラーをダウンロードし、インストールをすることで使用できます。OS Xの場合はHomebrewを使用するのも手です。

```
% node -v
v4.2.2
```

##### OPTION

Node.js はリリース間隔が速いので、インストーラからインストールするとバージョンアップが面倒になることがあります。必要に応じて [nodebrew](https://github.com/hokaccha/nodebrew) などからインストールしてください。

```
% nodebrew install-binary 4.2.2
% nodebrew use 4.2.2
% node -v
v4.2.2
```

#### パッケージのインストール

 * [npm](https://www.npmjs.com/)

一般的に Node.js のパッケージ管理には npm を使用しますが、このリポジトリも例に漏れず npm を使用します。npm 本体は Node.js をインストールした際に自動的に入っているはずです。

```
% npm -v
2.14.7
```

また、npm からインストールするパッケージは ``package.json`` に書いてあるので、 以下のコマンドにより一括でインストールできます。

```
% npm install
```

#### Gruntのインストール

 * [Grunt](http://gruntjs.com/)


### Ruby 関連

 * Ruby (2.1.0)
   * Bundler
   * Sass
   * scss_lint



## Author
 * windyakin

## License
[The MIT License](LICENSE)

## Copyright
&copy; 2015 SYSKEN
