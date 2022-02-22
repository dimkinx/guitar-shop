import {GuitarType, StringCountType} from './enums';
import {GuitarTypeTranslation} from './constants';

const GuitarTypeToTranslationMap = new Map([
  [GuitarType.Acoustic, GuitarTypeTranslation.Acoustic],
  [GuitarType.Electric, GuitarTypeTranslation.Electric],
  [GuitarType.Ukulele, GuitarTypeTranslation.Ukulele],
]);

const GuitarTypeToStringCountMap = new Map([
  [GuitarType.Acoustic, [StringCountType.Six, StringCountType.Seven, StringCountType.Twelve]],
  [GuitarType.Electric, [StringCountType.Four, StringCountType.Six, StringCountType.Seven]],
  [GuitarType.Ukulele, [StringCountType.Four]],
]);

const StringCountToGuitarTypeMap = new Map([
  [StringCountType.Four, [GuitarType.Ukulele, GuitarType.Electric]],
  [StringCountType.Six, [GuitarType.Acoustic, GuitarType.Electric]],
  [StringCountType.Seven, [GuitarType.Acoustic, GuitarType.Electric]],
  [StringCountType.Twelve, [GuitarType.Acoustic]],
]);

export {
  GuitarTypeToTranslationMap,
  GuitarTypeToStringCountMap,
  StringCountToGuitarTypeMap
};
