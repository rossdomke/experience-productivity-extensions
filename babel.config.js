module.exports = {
    sourceType: 'unambiguous',
    presets: [
        '@babel/preset-env',
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/transform-runtime'
    ],
    env: {
        test: {
            plugins: [
                'rewire'
            ]
        }
    }
}