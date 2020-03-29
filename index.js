
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));


abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
VotingContract = web3.eth.contract(abi);

contractInstance = VotingContract.at('0xaf05418094323526d0cb6205318def143963fe3b');

candidates = {"Machinelearning":"candidate-1", "Deeplearning":"candidate-2","Blockchain":"candidate-3"}

function voteForCandidate(candidate){
    candidateName = $("#candidate").val();

    contractInstance.voteForCandidate(candidateName,{from:web3.eth.accounts[0], gas:4700000}, function(){
        let div_id = candidates[candidateName];
        $("#"+div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());

    });

};
$(document).ready(function(){
    candidateNames=Object.keys(candidates);

    for(var i=0; i<candidateNames.length; i++){
        let name = candidateNames[i];
        let val = contractInstance.totalVotesFor.call(name).toNumber();
        $("#" + candidates[name]).html(val);
    }
});