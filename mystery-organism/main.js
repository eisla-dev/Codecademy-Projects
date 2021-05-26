// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

let pAequorFactory = (number, DNAarr) => {
    return {
        specimenNum : number,
        dna : DNAarr,
        mutate (){
            let randomBase = Math.floor(Math.random() * 15);
            let selectedBase = this.dna[randomBase];
            let randomDNA;
            do{
                randomDNA = returnRandBase();
            } while (randomDNA == selectedBase);
            this.dna[randomBase] = randomDNA;
            return this.dna
        },
        compareDNA(pAequorObj){
            let inCommon = 0;
            let compareOrgDNA = pAequorObj.dna;
            for (let i = 0; i<this.dna.length; i++){
                if (this.dna[i] == compareOrgDNA[i]){
                    inCommon++
                }
            }
            let percent = inCommon / 15 * 100;
            console.log(`specimen #${this.specimenNum} and specimen ${pAequorObj.specimenNum} have ${percent.toFixed(1)}% DNA in common`);
        },
        willLikelySurvive(){
            let cgCount = 0;
            for (let i = 0; i<this.dna.length;i++){
                if (this.dna[i] == 'C' || this.dna[i] == 'G'){
                    cgCount++
                }
            }
            let cgPercent = cgCount / this.dna.length * 100;
            if (cgPercent.toFixed(2) >= 60){
                return true
            } else {
                return false
            }
        }
    }
}



//30 instances
let organismArray = []
for (let i = 1; i<=30; i++){
    let organism = pAequorFactory(i,mockUpStrand())
    organismArray.push(organism);
}
console.log(organismArray)



//let org1 = (pAequorFactory(1,mockUpStrand()))
//org1.mutate()
//let org2 = (pAequorFactory(2,mockUpStrand()))
//org1.compareDNA(org2)
//console.log(org1.dna)
//console.log(org1.willLikelySurvive())





