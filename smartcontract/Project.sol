pragma solidity 0.8.3;
pragma experimental ABIEncoderV2;

contract Project{
    
    enum Status {COMPLETED, PENDING, CANCELED}
    
    address payable public employer;
    address payable public freelancer;
    uint public deadline;
    uint public price;
    uint public remainingPayment;
    uint public createdAt;
    Status public status;
    
    bool locked = false;
        
    struct Request{
        string description;
        uint amount;
        bool locked;
        bool paid;
    }
    
    Request[] public requests;
    
    modifier onlyEmployer(){
        require(msg.sender == employer, "Only employer!");
        _;
    }
    
    modifier onlyFreelancer(){
        require(msg.sender == freelancer, "Only freelancer!");
        _;
    }
    
    modifier onlyPendingProject(){
        require(status == Status.PENDING, "Only pending!");
        _;
    }
    
    event RequestCreated(string description, uint amount, bool locked, bool paid);
    event RequestUnlocked(bool locked);
    event RequestPaid(address receiver, uint amount);
    event ProjectCompleted(address employer, address freelancer, uint amount, Status status);
    event ProjectCanceled(uint remainingPayment, Status status);
    
    constructor(address payable _freelancer, uint _deadline) payable {
        employer = payable(msg.sender);
        freelancer = _freelancer;
        createdAt = block.timestamp;
        deadline = createdAt + _deadline * 1 days;
        price = msg.value;
        remainingPayment = msg.value;
        status = Status.PENDING;
    } 
    
    receive() external payable{
        price += msg.value;
    }
    
    function createRequest(string memory _description, uint _amount) public onlyFreelancer onlyPendingProject{
        require(_amount <= remainingPayment, "High request price!");
        Request memory request = Request({
            description: _description,
            amount: _amount,
            locked: true,
            paid: false
        });
        
        requests.push(request);
        emit RequestCreated(request.description, request.amount, request.locked, request.paid);
    }
    
    
    
    function unlockRequest(uint _index) public onlyEmployer onlyPendingProject{
        Request storage request = requests[_index];
        require(request.locked, "Already unlocked!");
        request.locked = false;
        emit RequestUnlocked(request.locked);
    }
    
    
    function payRequest(uint _index) public onlyFreelancer{
        
        require(!locked, "Reenterant detected!");
        Request storage request = requests[_index];
        require(!request.locked, "Request is locked!");
        require(!request.paid, "Already paid!");
        locked = true;
        (bool success, bytes memory transaction) = freelancer.call{value: request.amount}("");
        
        require(success, "Transaction failed!");
        remainingPayment -= request.amount;
        request.paid = true;
        locked = false;
        emit RequestPaid(msg.sender, request.amount);
    }
    
    
    function completeProject() public onlyEmployer onlyPendingProject{
        
        require(!locked, "Reenterant detected!");
        locked = true;
        (bool success, bytes memory transaction) = freelancer.call{value: remainingPayment}("");
        require(success, "Transaction failed!");
        status = Status.COMPLETED;
        locked = false;
        remainingPayment = 0;
        emit ProjectCompleted(employer, freelancer, remainingPayment, status);
    }
    
    
    function cancelProject() public onlyEmployer onlyPendingProject{
        
        require(block.timestamp >= deadline, "Deadline already passed");
        status = Status.CANCELED;
        emit ProjectCanceled(remainingPayment, status);
    }
    
    function increaseDeadline(uint _deadline) public onlyEmployer onlyPendingProject{
        
        deadline += _deadline * 1 days;
    }
}