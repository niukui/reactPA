const rules = [
  {
    "When": 'return data.FirstAttempt.ContactResults === true',
    "Then": 'show',
    "Sources": ['OutreachAttempts.FirstAttempt.ContactResults'],
    "Targets": ['OutreachAttempts.FirstAttempt.OutreachDate']
  }, {
    "When": 'return !data.FirstAttempt || data.FirstAttempt.ContactResults !== false',
    "Then": 'hide',
    "Sources": ['OutreachAttempts.FirstAttempt.ContactResults'],
    "Targets": ['OutreachAttempts.SecondAttempt']
  }, {
    "When": 'return data.FirstAttempt.ContactResults === true && context.PageType ==="Edit"',
    "Then": 'show',
    "Sources": ['OutreachAttempts.FirstAttempt.ContactResults'],
    "Targets": ['OutreachAttempts.FirstAttempt.Comments']
  }, {
    "When": 'return data.FirstAttempt.ContactResults === false',
    "Then": 'show',
    "Sources": ['OutreachAttempts.FirstAttempt.ContactResults'],
    "Targets": ['OutreachAttempts.FirstAttempt.FailedReason']
  }, {
    "When": 'return data.FirstAttempt.ContactResults === false && context.PageType ==="Edit"',
    "Then": 'show',
    "Sources": ['OutreachAttempts.FirstAttempt.ContactResults'],
    "Targets": ['OutreachAttempts.FirstAttempt.ContactDate']
  }, {
    "When": 'return data.SecondAttempt.ContactResults === true',
    "Then": 'show',
    "Sources": ['OutreachAttempts.SecondAttempt.ContactResults'],
    "Targets": ['OutreachAttempts.SecondAttempt.OutreachDate']
  }, {
    "When": 'return data.SecondAttempt.ContactResults === true && context.PageType==="Edit"',
    "Then": 'show',
    "Sources": ['OutreachAttempts.SecondAttempt.ContactResults'],
    "Targets": ['OutreachAttempts.SecondAttempt.Comments']
  }, {
    "When": 'return data.SecondAttempt.ContactResults === false',
    "Then": 'show',
    "Sources": ['OutreachAttempts.SecondAttempt.ContactResults'],
    "Targets": ['OutreachAttempts.SecondAttempt.FailedReason']
  }, {
    "When": 'return data.SecondAttempt.ContactResults === false && context.PageType==="Edit"',
    "Then": 'show',
    "Sources": ['OutreachAttempts.SecondAttempt.ContactResults'],
    "Targets": ['OutreachAttempts.SecondAttempt.ContactDate']
  },{
    "When": 'return data.CCAssignmentStatus === true',
    "Then": 'show',
    "Sources": ['Assignment.CCAssignment.CCAssignmentStatus'],
    "Targets": ['Assignment.CCAssignment.CCAssignmentAssigned', 'Assignment.CCAssignment.CCAssignmentDate']
  },{
    "When": 'return data.CCAssignmentStatus === false',
    "Then": 'show',
    "Sources": ['Assignment.CCAssignment.CCAssignmentStatus'],
    "Targets": ['Assignment.CCAssignment.CCAssignmentUnAssigned']
  },{
    "When": 'return data.CMOUAssignmentStatus === true',
    "Then": 'show',
    "Sources": ['Assignment.CMOUAssignment.CMOUAssignmentStatus'],
    "Targets": ['Assignment.CMOUAssignment.CMOUAssignmentAssigned', 'Assignment.CMOUAssignment.CMOUAssignmentDate']
  },{
    "When": 'return data.CMOUAssignmentStatus === false',
    "Then": 'show',
    "Sources": ['Assignment.CMOUAssignment.CMOUAssignmentStatus'],
    "Targets": ['Assignment.CMOUAssignment.CMOUAssignmenttUnAssigned']
  },{
    "When": 'return data.SCAssignmentStatus === true',
    "Then": 'show',
    "Sources": ['Assignment.SCAssignment.SCAssignmentStatus'],
    "Targets": ['Assignment.SCAssignment.SCAssignmenttAssigned', 'Assignment.SCAssignment.SCAssignmentDate']
  },{
    "When": 'return data.SCAssignmentStatus === false',
    "Then": 'show',
    "Sources": ['Assignment.SCAssignment.SCAssignmentStatus'],
    "Targets": ['Assignment.SCAssignment.SCAssignmenttUnAssigned']
  }
]

export default rules;
