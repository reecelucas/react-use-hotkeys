interface ModifierKeyMap {
  control: string;
  shift: string;
  alt: string;
  meta: string;
  [key: string]: string;
}

const modifierKeyMap: ModifierKeyMap = {
  control: 'ctrlKey',
  shift: 'shiftKey',
  alt: 'altKey',
  meta: 'metaKey'
};

export default (keys: string[]) => keys.map(k => modifierKeyMap[k]);
