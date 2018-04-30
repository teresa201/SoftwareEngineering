let randint= function(min, max)
{
  return Math.floor(Math.random() * (max - min + 1) ) + min
}
let choice=function(list)
{
  return list[randint(0, list.length - 1)]
}

class Test{

//gate is a map through the execution sequence
constructor()
{
  this.index = 0
  this.gate = [this.setup, this.scenario, this.action, this.informer, this.damages, this.usual, this.restart, this.responsibility, this.followup,
  this.policy, this.govt, this.ransom, this.internal, this.impact]

}

generate(choices, text)
{
  let results = {}

  if(this.index >= this.gate.length)
    return {end: true}
  do{
    results = {} //Here in case a choice doesn't need to be called
    results = this.gate[this.index++](choices, text)
  }while(results.skip)

  return results
}

//initial assets setup
setup()
{
  this.assetList = ['Domain Controller', 'Internal DNS', 'Data Center', 'Web Server', 'Public Sector Data/Projects']
  return {list: this.assetList, text: 'What assets do we have?'}
}

//generate scenario based on choices in assetList
scenario(choices, text)
{

  //HAVE FRONTEND SEND ALL UNCHECKED BOXES
  for(let value in choices)
    this.assetList[choices[value]] = ''

  for(let asset = 0; asset < this.assetList.length; asset++)
    if(this.assetList[asset] == '')
      this.assetList.splice(asset--, 1);

  let warnings = ['Code Red! Our ', 'Help! Our ', 'Warning! Our ', 'There has been an emergency. Our ',
  'The company monitoring tools have shown that our ', 'Please do not panic. However, our ']
  this.services = ['Domain Controller', 'DHCP Server', 'Internal DNS Server', 'Data Center', 'Web Server', 'C-level executive\'s workstation'] //Increasingly external services
  this.serviceInt = randint(0, this.services.length - 1)
  this.attackers = [['an unknown entity', 0], ['a foreign agent', 10], ['a disgruntled employee', 8], ['a hacking group', 7], ['a lone wolf attacker', 5], ['auto-exploit programs', 2]] //Decreasing Severity
  this.attackerVar = choice(this.attackers)
  this.attacks = [['been mysteriously impacted with unknown severity', 0], ['been breached by ' + this.attackerVar[0], 3 + this.attackerVar[1]],
  ['been infected by ransomware', 6], ['had important company data exfiltrated by ' + this.attackerVar[0], 6 + this.attackerVar[1]], ['gone offline', this.serviceInt * 2.5],
  ['been vandalized by ' + this.attackerVar[0], 6 + this.attackerVar[1]], ['been totally wiped clean by ' + this.attackerVar[0], 8 + this.attackerVar[1]]]
  this.attackInt = randint(0, this.attacks.length - 1)


  let finders = ['We discovered', 'Our sensors indicate', 'An employee has reported', 'Our security team brought to our attention']
  this.vulnerabilities = ['breached using an unknown method', 'hit by a zero-day', 'running an outdated operating system', 'running an unpatched service',
  'lacking the implementation our security protocols', 'lacking our intrusion detection software']		//Increasing preventability
  this.vulnInt = randint(0, this.vulnerabilities.length - 1)

  return {list: [], text: choice(warnings) + this.services[this.serviceInt] + ' has ' + this.attacks[this.attackInt][0] + '.\n' + choice(finders)
  + ' that said ' + this.services[this.serviceInt] + ' was ' + this.vulnerabilities[this.vulnInt] + '.'}
}

//action options
action()
{
  return {list: ['Unknown', 'Accept Risk', 'Inform IT', 'Inform Security', 'Add the Patch Immediately', 'Investigate More Thoroughly',
  'Allow Problem to Resolve Itself', 'Ask a Coworker', 'Do Nothing', 'Assess Damage', 'Look for Impacted Assets'], text:"What do you do? Expound on that choice."}
}

//if chose inform IT or Security
informer(optionInt)
{
  if(optionInt == 2 || optionInt == 3)
    return {list:[], text: 'They ask you what company policy is in this scenario. What assets do you think are affected by this issue and how?'}

  return {skip: true}
}


damages()
{
  if(choice([0, 1]))
    return {list:[], text: 'On a scale of 1-10, how damaging is this to the company and its finances?'}
  else
    return {list:[], text: 'Who are the stakeholders impacted? Who do we notify?'}

}

usual()
{
  this.serviceRename = this.services[this.serviceInt]
  if(this.serviceInt == this.services.length - 1)
    this.serviceRename = "workstation"
  if(choice([0, 1]))
    return{skip: true}

  return {list:[], text: 'What do you do when you notice that the ' + this.serviceRename + ' is malfunctioning? Please go into additional detail.'}
  //Add options if more time available
}

restart()
{
  let choicertest = choice([0, 1, 2])
  if(choicertest == 2)
    return {list:[], text: 'How can we prevent this from spreading?'}
  else if(choicertest == 1)
    return {list:[], text: 'How do we safely add this resource back to the network?'}
  else
    return {list:[], text: 'What is our backup process?'}
}

responsibility(){
  if(choice([0, 1]))
    return {list:[], text:'Who is responsible for fixing this issue? Do they know?'}
  else
  {
  this.time = true;
  return {list:['Yes', 'No'], text:'How long can our company sustain this state before it encounters serious losses, monetarily or otherwise? What kinds of losses will the company experience?'}
  //Time Range
  }

}

followup(){
  if(this.time)
    return {list:['Yes', 'No'], text:'Based on your understanding of our recovery teams, will the services be restored by this point in time?'}
  else
    return {list:['Yes', 'No'], text:'Do we inform other sectors of the company? Who is responsible for communication regarding this issue?'}

}

policy()
{
  if(choice([0, 1, 2, 3]))		//25% chance of not getting
    return {list:[], text: 'What is our process for reviewing the issue, determining points of failure, and mitigating the problem?'}

  return {skip: true}
}

govt()
{
  if(this.assetList.indexOf('Public Sector Data/Projects') < 0)
    return {list:['Yes', 'No'], text:'Were any government systems impacted?\nHow must we approach this issue in order to comply with federal regulations and maintain compliance?'}

  return {skip: true}
}

ransom()
{
  if(this.attackInt == 2)
    return {list:['Yes', 'No'], text:'Do you pay the ransom? Why or why not?'}

  return {skip: true}
}

internal()
{
  let possibilities = ['Employee Workstations', 'Web Server', 'Cell Phone', 'Wifi Hacking', 'Social Engineering', 'Encryption Breaking', 'Employee Betrayal']
  if(this.serviceInt == 4)
    possibilities.splice(1, 1)
  if(this.serviceInt < 3 && this.attackerVar != 2)       //Internal service and not disgruntled employee
    return {list:[], text: 'Because the ' + this.serviceRename + ' was compromised, that indicates that other internal systems were impacted. What may have the attacker used to pivot into these systems? How do we prevent this in the future?'}

  return {skip: true}
}

impact()
{
  let impacted = ['How will our employees be able to do their work without logging into the domain?', 'How will employees use the network without a DHCP Server?', 'How do we deal with being unable to route traffic to internal domains?',
  'How can we recover from a disaster in our data center?', 'How do web-related incidents impact our business?', 'What kinds of data can our executive access?']
  impacted = impacted[this.serviceInt]
  if(this.attackInt == 1 || this.attackInt == 3)
    impacted = 'How will we maintain business operations knowing that we work using a compromised ' + this.serviceRename
  return {list:[], text:impacted}
}

unknown1()
{
  if(this.attackerVar[1] == 0)    //Unknown
    return {list:[], text:'How will we go about discovering the source of the incident?'}
}

unknown2()
{
  if(this.attackInt == 0)    //Unknown
    return {list:[], text:'We know there is a problem but do not know what the problem is. What are some common ways this service can be impacted and how do we fix some of those issues?'}
}

}

/*let test = new Test()
let lister = test.generate();
//console.log(lister.text)
lister = test.generate();
//console.log(lister.list)
//console.log(lister.text)
lister = test.generate();
lister = test.generate();
console.log(lister.text)
lister = test.generate();
console.log(lister.text)
lister = test.generate();
console.log(lister.text)
lister = test.generate();
console.log(lister.text)
lister = test.generate();
console.log(lister.text)
lister = test.generate();
console.log(lister.text)
lister = test.generate();
console.log(lister.text)
lister = test.generate();
console.log(lister.text)*/
