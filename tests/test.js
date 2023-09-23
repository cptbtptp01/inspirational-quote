const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const Quote = require('../service/quoteService');

chai.use(chaiHttp);

describe('Test API', () => {
  it('should get all authors', (done) => {
    chai
      .request(app)
      .get('/api/authors')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').and.have.lengthOf(335);
        done();
      });
  });

  it('should get a random quote', (done) => {
    chai
      .request(app)
      .get('/api/quotes/random')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('quote');
        expect(res.body).to.have.property('author');
        done();
      });
  });

  it('should get empty array', (done) => {
    chai
      .request(app)
      .get('/api/quotes?q=abc')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').and.have.lengthOf(0);
        done();
      });
  });

  it('should get non empty array', (done) => {
    chai
      .request(app)
      .get('/api/quotes?author=Anais%20Nin')
      .end((err, res) => {
        expect(res).to.have.status(200);
        const quotes = res.body;
        quotes.forEach((quote) => {
          expect(quote).to.satisfies((q) => {
            return q.author.toLowerCase().includes('anais nin');
          });
        });
        done();
      });
  });
});

describe('Test Database', () => {
  it('should get a random quote', async () => {
    const quote = await Quote.findRandomQuote();
    expect(quote).to.have.property('id');
    expect(quote).to.have.property('author');
    expect(quote).to.have.property('quote');
  });

  it('should get quotes contains "lucky" or having author name containing "lucky" ', async () => {
    const str = 'lucky';
    const quotes = await Quote.find(str);
    expect(quotes).to.be.an('array');
    quotes.forEach((quote) => {
      expect(quote).to.satisfies((q) => {
        return q.quote.toLowerCase().includes(str) || q.author.toLowerCase().includes(str);
      });
    });
  });
});
