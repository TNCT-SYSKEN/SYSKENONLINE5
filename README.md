# SYSKEN ONLINE ver.5

[![Build Status](https://travis-ci.org/TNCT-SYSKEN/SYSKENONLINE5.svg?branch=master)](https://travis-ci.org/TNCT-SYSKEN/SYSKENONLINE5)
[![devDependency Status](https://david-dm.org/TNCT-SYSKEN/SYSKENONLINE5/dev-status.svg)](https://david-dm.org/TNCT-SYSKEN/SYSKENONLINE5#info=devDependencies)
[![The MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

このリポジトリは[SYSKEN ONLINE](http://sysken.org/)のWordPressテーマを管理しているリポジトリです。

(そのうちフロントエンド開発のオレオレテンプレートにもなるはず)

## Plan

実装させる予定の機能

 - [x] タスクランナーによるアセットファイルの自動生成
 - [ ] デザインの変更
   - [ ] レスポンシブレイアウトによるスマートフォン対応
 - [ ] 中退フラグの実装


## How to build

このリポジトリを健全に使用するためには以下のライブラリが必要です。なお説明の際に記述しているバージョンはこのREADME.mdを執筆している時点(2015年11月)の安定版・最新版のバージョンです。

 * Node.js
   * Grunt
   * Bower
 * Ruby
   * Bundler
   * Sass, scss_lint etc...

### Node.js

#### Node.js 本体のインストール

 * [Node.js](https://nodejs.org/en/) - v4.2.x

基本的にはNode.jsのページからインストーラーをダウンロードし、インストールすることで使用できるようになります。

```
% node -v
v4.2.2
```

##### 備考

Node.js はリリース間隔が短いため、インストーラからインストールしているとバージョンアップが面倒になることがあります。必要に応じて [nodebrew](https://github.com/hokaccha/nodebrew)  や [nodist](https://github.com/marcelklehr/nodist) などからインストールをしてください。

#### Node.jsのパッケージのインストール

 * [npm](https://www.npmjs.com/)

一般的に Node.js のパッケージ管理には npm を使用します。npm 本体は Node.js をインストールした際に自動的に入っているはずです。

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

タスクランナーには(いろいろな制約のせいで未だに) Grunt を使用しています。 Grunt そのものが npm を通じて配信されているので、 ``package.json`` にもインストールをするように記述してありますが、ここではコマンドラインから直接利用できるようにするために ``-g`` オプションを指定してインストールを行います。

```
% npm insatll -g grunt-cli
% grunt --version
grunt-cli v0.1.13
grunt v0.4.5
```

#### Bowerのインストール

 * [Bower](http://bower.io/)

jQueryをはじめとするコンポーネントのインストールには Bower を利用しています。これもGruntと同じくコマンドラインから直接利用できるようにするために、 npm から ``-g`` オプションを指定してインストールを行います。

```
% npm install -g bower
% bower -v
1.6.5
```

Bower からコンポーネントをインストールする処理は既に Grunt でタスクが定義されています。


### Ruby

#### Ruby本体のインストール

 * [Ruby](https://www.ruby-lang.org/ja/) - v2.2.3

Sassのコンパイルや構文チェック(Linter)にはRubyを使用します。OS Xやその他Unix/Linux系OSを使用している場合には、Rubyのバージョン管理が容易に行える [rbenv](https://github.com/sstephenson/rbenv) を使用すると便利です。

```
% ruby -v
ruby 2.2.3p173 (2015-08-18 revision 51636) [x86_64-darwin14]
```


#### Bundlerのインストール

Rubyのパッケージ管理システムは [RubyGems](https://rubygems.org/) ですが、プロジェクトごとに異なるバージョンのパッケージを利用したい場合に色々な不都合が生じます。そこで、パッケージの管理には [Bundler](http://bundler.io/) というものを使用します。

とはいえ Bundler 本体は RubyGems を使ってインストールします。

```
% gem install bundler
% bundle -v
Bundler version 1.10.6
```


#### Rubyの各種パッケージのインストール

Bundler をインストールしたら各種パッケージをインストールします。インストールするパッケージとバージョンは ``Gemfile`` に記述されているので以下のコマンドによって一括でインストールが行えます。

```
% bundle install --path vendor/bundle
```

これで ``vendor/bundle/`` 以下にインストールされます。 Bundler を使ってインストールしたコマンドは ``bundle exec [***]`` で使用することができるはずです。試しにSassコンパイラを起動してみましょう。

```
% bundle exec sass -v
Sass 3.4.19 (Selective Steve)
```

これでビルド環境の準備は完了です。お疲れ様でした！


## Memo

### フォルダ運用の方針

 * ``src/`` にはアセット系のものを配置するディレクトリ
   * ``scss/`` - SCSSとその設定ファイルなど
   * ``js/`` - JavaScriptとその設定ファイルなど
   * ``img/`` - 画像
   * ``lib/`` - Bower を使って入手できないコンポーネント
 * ``dev/`` はローカルテスト用のディレクトリ
   * ローカル上で試すときはここをルートディレクトリにする(WordPressの場合はテーマのフォルダ)
   * HTMLやPHPなど、 ``src/`` に配置できないファイルは ``dev/`` 以下に配置する
   * ``dev/assets/`` と ``dev/lib/`` は予約済みなので同名のフォルダを作り使うことはできない(後述)
     * Gitでファイル変更がトラックされない(.gitignore)
     * 開発タスクやビルドタスクを走らせると一度中身が全て消される
   * ``dev/assets/`` の中身は **全て** ``src/`` からタスクランナーにより自動生成されるものとする
     * ``dev/assets/`` には ``src/`` から **minifyされていない** コードが生成される
   * ``dev/lib/`` の中身は **全て** Bower からインストールしたコンポーネント もしくは ``src/lib/`` の中身とする
     * 自作アイコンフォントなど、 Bower を使って入手できないコンポーネントは ``src/lib/`` に入れる
     * ``lib/`` の中身は最適化やminifyなどは行わず、オリジナルからの単純なコピーとなる
     * Bower と ``src/lib/`` で同名のフォルダ・ファイルがある場合、 ``src/lib/`` が優先される(上書きされる)
 * ``dist/`` はビルド生成された本番環境用のディレクトリ
   * 公開にあたってはこの ``dist/`` 自体をルートディレクトリにする
   * ``dist/`` の中身 **全て** が ``src/`` もしくは ``dev/`` から自動生成されるものとする
   * ビルドタスクを走らせると一度中身が全て消され、それぞれコードを生成・コピーされる
   * ファイル指定が面倒になるのでminifyしても ``.min.{css,js}`` などにせず、同一のファイル名にする
   * ``dist/assets/`` には ``src/`` から **minifyされた** コードが生成される

### Grunt の各タスクについて

#### メインで使用するタスク

##### dev

```
% grunt dev
```

* 開発用
* ``dev/``以下にファイルが出力される
* 同時にwatchタスクが走り、ファイルの変更があれば適宜ビルドタスクが走る

##### dist

```
% grunt dist
```

* リリース用
* ``dist/`` 以下に最終ファイルを出力する
* ``dist/assets/`` 以下のファイルの最適化が行われる
* ``% node start`` でも同様

#### メインのタスクを構成するタスク

* ``release``
  * 通常時に ``dev/`` に出力するフォルダを ``dist/`` に切り替える
  * 最初の子タスクに指定するとその後全てのタスクで有効
* ``init``
  * 既に生成済みのなんやかんやを削除する
* ``test``
  * Linterを走らせる
* ``lib``
  * Bower で指定しているコンポーネントをインストールして ``{dev,dist}/lib/`` に配置
  * ``src/lib/`` の内容を ``{dev,dist}/lib/`` にコピーする
* ``opt-assets``
  * ``assets/`` 内のファイルをminifyしたり最適化したりする
* ``build-css``
  * ``src/scss/`` 以下のSCSSをビルドし ``{dev,dist}/assets/css/`` に出力
  * ベンダープレフィックスを付与
  * プロパティの順序を並べかえる
  * linterによる構文チェックやminifyは行わない
* ``build-js``
  * ``src/js/`` 以下のJavaScriptを ``{dev,dist}/assets/js`` にコピー
  * linterによる構文チェックやminifyは行わない
* ``build-img``
  * ``src/`` 以下の画像ファイルを ``{dev,dist}/assets/img`` にコピー
  * 最適化は行わない
* ``build``
  * 上記の ``build-*`` 系をまとめて処理


## Author
 * windyakin


## License
[The MIT License](LICENSE)


## Copyright
&copy; 2015 SYSKEN
