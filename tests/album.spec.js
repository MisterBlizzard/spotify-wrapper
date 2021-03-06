// getAlbum
// getAlbumTracks

import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);

chai.use(sinonChai);

global.fetch = require('node-fetch');

import { getAlbum, getAlbums, getAlbumTracks } from "../src/album";
import { API_URL } from "../src/config";

describe('Album', () => {
    let stubedFetch;
    let promise;

    beforeEach(() => {
        stubedFetch = sinon.stub(global, 'fetch');
        promise = stubedFetch.returnsPromise();
    });

    afterEach( () => {
        stubedFetch.restore();
    });

    describe('smoke tests', () => {
        it('should have getAlbuns method', () => {
            expect(getAlbum).to.exist;
        });
    
        it('should have getAlbumTracks method', () => {
            expect(getAlbumTracks).to.exist;
        });
    });

    describe('getAlbum', () => {
        // verifica se o fetch ocorre
        it('should call fetch method', () => {
            const album = getAlbum();
            expect(stubedFetch).to.have.been.calledOnce;
        });
        
        // verifica se o fetch ocorre com a URL desejada
        it('should call fetch with the correct URL', () => {
            const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
            expect(stubedFetch).to.have.been
                .calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy`);

            const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
            expect(stubedFetch).to.have.been
                .calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTk`);
        });
        
        // verifixa se o dado é recebido pela promise
        it('should return the correct data from promise', () => {
            promise.resolves({ album: 'name' });
            const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
            expect(album.resolveValue).to.be.eql({ album: 'name' });
        });
    });

    describe('getAlbums', () => {
        it('should call fetch method', () => {
            const albums = getAlbums();
            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call fetch with the correct URL', () => {
            const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
            expect(stubedFetch).to.have.been
                .calledWith(`${API_URL}/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk`);
        });

        it('should return the correct data from promise', () => {
            promise.resolves({ album: 'name'});
            const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
            expect(albums.resolveValue).to.be.eql({ album: 'name'});
        });
    });

    describe('getAlbumTracks', () => {
        it('should call fetch method', () => {
            const tracks = getAlbumTracks();
            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call the correct URL', () => {
            const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
            expect(stubedFetch).to.have.been
                .calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks`);
        });

        it('should returns a promise', () => {
            promise.resolves({ album: 'name' });
            const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
            expect(tracks.resolveValue).to.be.eql({ album: 'name'});
        });
    });
});
