// rules that apply to all sub projects
module.exports = {
    noRestrictedImportPaths: [
        {
            name: 'lodash',
            message: 'Use deep imports for lodash so it is tree shakeable',
        },
        {
            name: 'react',
            importNames: ['useLayoutEffect', 'Suspense'],
            message:
                'useLayoutEffect and Suspense do not work for SSR apps. If you are confident useEffect will not work for your purposes consider using useIsoEffect.',
        },
    ]
};
