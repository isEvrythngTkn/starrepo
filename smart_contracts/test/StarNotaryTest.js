const StarNotary = artifacts.require('StarNotary')

const name = "awesome star!";
const story = "I love my wonderful star";
const token = 1;
const dec = "dec_121.874";
const mag = "mag_245.978";
const cent = "ra_032.155";

contract('StarNotary', accounts => { 

    const owner = accounts[0];

    beforeEach(async function() { 
        this.contract = await StarNotary.new({ from: owner })
    })
    
    // createStar()
    // tokenIdToStarInfo()
    describe('can create a star', () => { 
        it('can create a star and get its name', async function () { 
            const name = 'awesome star!';
            await this.contract.createStar(name, token, story, dec, mag, cent, { from: owner });
            
            const star = await this.contract.tokenIdToStarInfo(1);
            assert.equal(star[0], name);
        })
    })

    // checkIfStarExist()
    describe('can check if a star exists', () => {
        beforeEach(async function () { 
            await this.contract.createStar(name, token, story, dec, mag, cent, { from: owner });
        })

        it('can check if a star exists', async function () { 
            assert.isOk(await this.contract.checkIfStarExist(dec, mag, cent), true);
        })
    })

    // mint()
    it('can mint a new token', async function () {
        assert.isOk(await this.contract.mint(accounts[4], 54321, {from: owner}));
    })

    // ownerOf()
    it('can tell you the owner of a token', async function () {
        const tokenId = 54321;
        const tokenOwner = accounts[4];
        assert.isOk(await this.contract.mint(tokenOwner, tokenId, {from: owner}));
        assert.equal(await this.contract.ownerOf(tokenId), tokenOwner);
    });

    describe('buying and selling stars', () => { 
        let user1 = accounts[1]
        let user2 = accounts[2]
        let randomMaliciousUser = accounts[3]
        
        let starId = 1
        let starPrice = web3.toWei(.01, "ether")

        beforeEach(async function () { 
            await this.contract.createStar(name, starId, story, dec, mag, cent, {from: user1});
        })

        // putStarUpForSale()
        // starsForSale()
        it('user1 can put up their star for sale', async function () { 
            assert.equal(await this.contract.ownerOf(starId), user1)
            await this.contract.putStarUpForSale(starId, starPrice, {from: user1})
            
            assert.equal(await this.contract.starsForSale(starId), starPrice)
        })

        // putStarUpForSale()
        // buyStar()
        describe('user2 can buy a star that was put up for sale', () => { 
            beforeEach(async function () { 
                await this.contract.putStarUpForSale(starId, starPrice, {from: user1})
            })

            it('user2 is the owner of the star after they buy it', async function() { 
                await this.contract.buyStar(starId, {from: user2, value: starPrice, gasPrice: 0})
                assert.equal(await this.contract.ownerOf(starId), user2)
            })

            it('user2 ether balance changed correctly', async function () { 
                let overpaidAmount = web3.toWei(.05, 'ether')
                const balanceBeforeTransaction = web3.eth.getBalance(user2)
                await this.contract.buyStar(starId, {from: user2, value: overpaidAmount, gasPrice: 0})
                const balanceAfterTransaction = web3.eth.getBalance(user2)

                assert.equal(balanceBeforeTransaction.sub(balanceAfterTransaction), starPrice)
            })
        })
    })

    describe("singular token approval process", () => {
        beforeEach(async function () { 
            await this.contract.createStar(name, token, story, dec, mag, cent, { from: owner });
        })

        // approve()
        // getApproved()
        it('approves the token for another address to control', async function () {
            const recipient = accounts[7];
            await this.contract.approve(recipient, token, {from: owner});
            assert.equal(await this.contract.getApproved(token), recipient);
        })
    })
    
    describe("multiple token approval process", () => {
        const secondTokenId = 653485643;
        const recipient = accounts[7];

        beforeEach(async function () { 
            await this.contract.createStar(name, token, story, dec, mag, cent, { from: owner });
            await this.contract.createStar("arigato", secondTokenId, "hey", "dec_23", "mag_12", "cent_123", { from: owner });
        })

        // setApprovalForAll()     
        // isApprovedForAll()
        it('sets approval for all', async function () {
            await this.contract.setApprovalForAll(recipient, true, { from: owner });
            assert.isOk(this.contract.isApprovedForAll(owner, recipient));
        })
    })

    // safeTransferFrom()
    it('allows the transfer of token from one address to another', async function () {
        const from = accounts[2];
        const to = accounts[8];
        await this.contract.createStar(name, token, story, dec, mag, cent, { from: from });
        await this.contract.safeTransferFrom(from, to, token, { from: from });
        assert.equal(await this.contract.ownerOf(token), to);
    })    
})