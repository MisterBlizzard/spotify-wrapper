import chai, { expect } from 'chai'; // lib de recursos para TDD
import sinon from 'sinon'; // lib que trabalha com promises
import sinonChai from 'sinon-chai'; // integra o sinon com o chai
import sinonStubPromise from 'sinon-stub-promise'; // para trabalhar com a promise
chai.use(sinonChai); // dizendo para os assets chai usar a interface do sinon
sinonStubPromise(sinon); // dizendo para o sinonStubPromise usar os objetos do sinon

global.fetch = require('node-fetch'); // global fetch é utilizado nos browsers

import  { API_URL, HEADERS } from '../src/config';
import { search, searchAlbums, searchArtists, searchPlaylists, searchTracks, getToken } from '../src/search';

describe('Spotify Wrapper', () => {

    let fetchedStub;
    let promise;

    beforeEach( () => {
        fetchedStub = sinon.stub(global, 'fetch');
        promise = fetchedStub.returnsPromise();
    });

    afterEach( () => {
        fetchedStub.restore();
    });

    describe('smoke tests', () => {
        // search genérico (mais de um tipo de busca)
        // seach album
        // seach track
        // seach artist
        // seach playlist

        it('should have exists search function', () => {
            expect(search).to.be.a('function');
        });

        it('should have exists searchAlbuns function', () => {
            expect(searchAlbums).to.be.a('function');
        });

        it('should have exists searchArtists function', () => {
            expect(searchArtists).to.be.a('function');
        });

        it('should have exists searchTracks function', () => {
            expect(searchTracks).to.be.a('function');
        });

        it('should have exists searchPlaylists function', () => {
            expect(searchPlaylists).to.be.a('function');
        });        
    });

    describe('Generic search', () => {        

        it('should call fetch function', () => {
            const artists = search();
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should receive the correct url to fetch', () => {
            context('passing one type', () => {
                const artist = search('muse', 'artist');

                expect(fetchedStub).to.have.been
                    .calledWith(`${API_URL}/search?q=muse&type=artist`);
    
                const albuns = search('muse', 'album');
                
                expect(fetchedStub).to.have.been
                    .calledWith(`${API_URL}/search?q=muse&type=album`);
            });

            context('passing more then one type', () => {
                const artistsAndAlbuns = search('muse', ['artist', 'album']);

                expect(fetchedStub).to.have.been
                    .calledWith(`${API_URL}/search?q=muse&type=artist,album`);
            });
        });
        
        it('should return the json data from the promise', () => {
            promise.resolves({ body: 'json' });
            const artists = search('muse', 'artist');
    
            expect(artists.resolveValue).to.be.eql({ body: 'json' });
        });

    });

    describe('seachArtists', () => {
        it('should call fetch function', () => {
            const artist = searchArtists('muse');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const artist = searchArtists('muse');
            expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=muse&type=artist`);
        });
    });

    describe('seachAlbums', () => {
        it('should call fetch function', () => {
            const album = searchAlbums('muse');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const album = searchAlbums('muse');
            expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=muse&type=album`);
        });
    });

    describe('seachTracks', () => {
        it('should call fetch function', () => {
            const track = searchTracks('muse');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const track = searchTracks('muse');
            expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=muse&type=track`);
        });
    });

    describe('seachPlaylist', () => {
        it('should call fetch function', () => {
            const playlist = searchPlaylists('muse');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const playlist = searchPlaylists('muse');
            expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=muse&type=playlist`);
        });
    });
});
