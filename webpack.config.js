module.exports = {
  mode: "development", // 開発環境モード
  entry: "./src/index.js", // 最初に見に行くファイル先のpath
  output: { // バンドル後のファイルの出力先
    path: `${__dirname}/dist`, //__dirnameはwebpack.config.jsが存在する階層を表す
    filename: "bundle.js",// バンドル後のファイル名を指定
  },
  devServer: { // バンドルしたファイルをローカルサーバーで見に行ってねという設定
    static: "./dist", // ./distにあるものを見る
  },
  resolve: {
    extensions: [".js", ".glsl"], // これらの拡張子はimport時に省略できます
  },
  module: {
    rules: [
      // JavaScriptのコンパイル設定
      { // これはesのバージョンが古いものに対しても互換性のある記述に変換する為
        test: /\.js$/, // 拡張子が.jsのものはbabel-loaderによってコンパイルする
        exclude: /node_modules/, // このディレクトリにあるjsファイルは対象外に設定
        use: ["babel-loader"], // esのバージョンが古いものに対して互換性のある記述に変換するコンパイラー
      },
      // Shaderのコンパイル設定
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        type: "asset/source", // use: ["raw-loader"]でも機能するが webpack5 の assets module を使用
        generator: { // ファイルネームの出力設定
          filename: "assets/images/[hash][ext]", // データによってファイル名が決定するという記述
        },
      },
      // Imagesのコンパイル設定
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext]", // 画像のデータによってファイル名が決定するという記述
        },
      },
      // CSSのコンパイル設定
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ]
  }
}