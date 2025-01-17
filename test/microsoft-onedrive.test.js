import { getFileIcon, getFilteredFiles } from '../src/microsoft/context-providers/microsoft-drive-context-provider.js';

const mockFiles = require('./mock-data/files.json');
let file = mockFiles[0];
let oneNotePackage = mockFiles[13];

jest.mock('@microsoft/mgt-components/dist/es6/styles/fluent-icons', () => (
    {
        getFileTypeIconUriByExtension: jest.fn( (fileType, size, iconType) =>  {
            return `https://spoprod-a.akamaihd.net/files/fabric-cdn-prod_20201008.001/assets/item-types/48/${fileType}.svg`;
        })
    }
));


describe('getFileIcon test', () => {

    it('should return file icon URL', () => {
        const fileIconUrl = getFileIcon(file);
        expect(fileIconUrl).toBe("https://spoprod-a.akamaihd.net/files/fabric-cdn-prod_20201008.001/assets/item-types/48/docx.svg");
    });

    it('should return generic file icon URL', () => {
        file.name = 'DemoDocument.other';
        const fileIconUrl = getFileIcon(file);
        expect(fileIconUrl).toBe("https://spoprod-a.akamaihd.net/files/fabric-cdn-prod_20201008.001/assets/item-types/48/other.svg");
    });

    it('should return oneNote file icon URL', () => {
        const fileIconUrl = getFileIcon(oneNotePackage);
        expect(fileIconUrl).toBe("https://spoprod-a.akamaihd.net/files/fabric-cdn-prod_20201008.001/assets/item-types/48/onetoc.svg");
    });

});


describe('getFilteredFiles test', () => {

    it('should return only 10 files', () => {
        expect(mockFiles.length).toBe(14);
        let files = JSON.parse(JSON.stringify(mockFiles));
        const filteredFiles = getFilteredFiles(files);
        console.log(filteredFiles);
        expect(filteredFiles.length).toBe(10);
    });

    it('should filterout folders', () => {
        let files = JSON.parse(JSON.stringify(mockFiles));
        const filteredFiles = getFilteredFiles(files);
        filteredFiles.map( (file) => {
            expect(file.folder).toBeUndefined();
        });
    });

    it('should have a generic file object with property like webViewLink', () => {
        let files = JSON.parse(JSON.stringify(mockFiles));
        const filteredFiles = getFilteredFiles(files);
        filteredFiles.map( (file) => {
            expect(file.webUrl).toBeUndefined();
            expect(file.webViewLink).toBeDefined();
        });
    });

});
