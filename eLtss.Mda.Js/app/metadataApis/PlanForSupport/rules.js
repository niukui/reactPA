import {ISP_SIGNATURE_TYPE_IDS, ISP_SIGNER_TYPE_IDS} from 'utils/constants'
const rules = [
    {
      "When": `return data.Signatures.SignatureType.Id === '${ISP_SIGNATURE_TYPE_IDS.eSignature}'`,
      "Then": 'mark:ESignature',
      "Sources": ["Signatures.SignatureType"],
      "Targets": ['Signatures.Base64Data']
    }, {
      "When": `return data.Signatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.written}'`,
      "Then": 'mark:WrittenSignature',
      "Sources": ['Signatures.SignatureType'],
      "Targets": ['Signatures.Base64Data']
    }, {
      "When": `return data.Signatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.written}'`,
      "Then": 'makeOptional',
      "Sources": ['Signatures.SignatureType'],
      "Targets": ['Signatures.Base64Data']
    }, {
      "When": `return data.Signatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.written}'|| data.Signatures.SignatureType.Id==='${ISP_SIGNATURE_TYPE_IDS.eSignature}'`,
      "Then": 'show',
      "Sources": ['Signatures.SignatureType'],
      "Targets": ['Signatures.Base64Data']
    }, {
      "When": `return data.SafetyRestriction.SafetyRestrictionSignatures.SignatureType.Id === '${ISP_SIGNATURE_TYPE_IDS.eSignature}'`,
      "Then": 'mark:ESignature',
      "Sources": ["SafetyRestriction.SafetyRestrictionSignatures.SignatureType"],
      "Targets": ['SafetyRestriction.SafetyRestrictionSignatures.Base64Data']
    }, {
      "When": `return data.SafetyRestriction.SafetyRestrictionSignatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.written}'`,
      "Then": 'mark:WrittenSignature',
      "Sources": ['SafetyRestriction.SafetyRestrictionSignatures.SignatureType'],
      "Targets": ['SafetyRestriction.SafetyRestrictionSignatures.Base64Data']
    }, {
      "When": `return data.SafetyRestriction.SafetyRestrictionSignatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.written}'`,
      "Then": 'makeOptional',
      "Sources": ['SafetyRestriction.SafetyRestrictionSignatures.SignatureType'],
      "Targets": ['SafetyRestriction.SafetyRestrictionSignatures.Base64Data']
    }, {
      "When": `return data.SafetyRestriction.SafetyRestrictionSignatures.SignatureType.Id ==='${ISP_SIGNATURE_TYPE_IDS.written}'|| data.SafetyRestriction.SafetyRestrictionSignatures.SignatureType.Id==='${ISP_SIGNATURE_TYPE_IDS.eSignature}'`,
      "Then": 'show',
      "Sources": ['SafetyRestriction.SafetyRestrictionSignatures.SignatureType'],
      "Targets": ['SafetyRestriction.SafetyRestrictionSignatures.Base64Data']
    }
  ];

export default rules;