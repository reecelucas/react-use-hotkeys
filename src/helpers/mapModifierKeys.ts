interface ModiferKeyMap {
  control: string;
  shift: string;
  alt: string;
  meta: string;
  [key: string]: string;
}

const modiferKeyMap: ModiferKeyMap = {
  control: 'ctrlKey',
  shift: 'shiftKey',
  alt: 'altKey',
  meta: 'metaKey'
};

export default (keys: string[]) => keys.map(k => modiferKeyMap[k]);
