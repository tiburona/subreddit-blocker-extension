// Fixture for doSkip

export interface TableFixture {
  outerTable: HTMLTableElement;
  outerTbody: HTMLTableSectionElement;
  parentTr: HTMLTableRowElement;
  innerTbody: HTMLTableSectionElement;
  tr1: HTMLTableRowElement;
  sibling: HTMLTableRowElement;
  other: HTMLTableRowElement; // not Reddit-like sibling
}

export function makeOuterTableFixture(): TableFixture {
  // outer table → tbody → parent <tr>
  const outerTable = document.createElement('table');
  const outerTbody = document.createElement('tbody');
  const parentTr = document.createElement('tr');

  outerTable.appendChild(outerTbody);
  outerTbody.appendChild(parentTr);

  // <td> that will hold an *inner* table
  const td = document.createElement('td');
  parentTr.appendChild(td);

  // inner table → inner tbody → two inner rows
  const innerTable = document.createElement('table');
  const innerTbody = document.createElement('tbody');
  const tr1 = document.createElement('tr'); // target row
  const sibling = document.createElement('tr'); // its sibling

  td.appendChild(innerTable);
  innerTable.appendChild(innerTbody);
  innerTbody.appendChild(tr1);
  innerTbody.appendChild(sibling);

  // give the rows realistic innerText
  tr1.innerText = 'r/AskReddit • 1k upvotes • 200 comments';
  sibling.innerText = 'r/funny • 200 votes • 50 comments';

  const other = document.createElement('tr'); // not Reddit‑like
  other.innerText = 'Some random Gmail row';
  innerTbody.appendChild(other);

  return {
    outerTable,
    outerTbody,
    parentTr,
    innerTbody,
    tr1,
    sibling,
    other,
  };
}

// Fixture for siblingsAreRedditLike

export interface SiblingVariantFixture {
  rlHas: HTMLTableRowElement;
  rlNo: HTMLTableRowElement;
  nonRlHas: HTMLTableRowElement;
  nonRlNo: HTMLTableRowElement;
}

function makeTbody(): HTMLTableSectionElement {
  return document.createElement('tbody');
}

function makeRlRow(sub: string): HTMLTableRowElement {
  const tr = document.createElement('tr');
  tr.innerText = `r/${sub} • 100 upvotes • 20 comments`;
  return tr;
}

function makeNonRlRow(): HTMLTableRowElement {
  const tr = document.createElement('tr');
  tr.innerText = 'Random Gmail row';
  return tr;
}

// Build the four independent tbodies and return their target rows.

export function makeSiblingVariantFixture(): SiblingVariantFixture {
  // 1. reddit-like row WITH reddit-like siblings
  const tbody1 = makeTbody();
  const rlHas = makeRlRow('funny');
  tbody1.appendChild(rlHas);
  tbody1.appendChild(makeRlRow('aww'));
  tbody1.appendChild(makeRlRow('gaming'));

  // 2. reddit-like row with NO reddit-like siblings
  const tbody2 = makeTbody();
  const rlNo = makeRlRow('news');
  tbody2.appendChild(rlNo);
  tbody2.appendChild(makeNonRlRow());
  tbody2.appendChild(makeNonRlRow());

  // 3. non-reddit row WITH reddit-like siblings
  const tbody3 = makeTbody();
  const nonRlHas = makeNonRlRow();
  tbody3.appendChild(nonRlHas);
  tbody3.appendChild(makeRlRow('pics'));
  tbody3.appendChild(makeRlRow('science'));

  // 4. non-reddit row with NO reddit-like siblings
  const tbody4 = makeTbody();
  const nonRlNo = makeNonRlRow();
  tbody4.appendChild(nonRlNo);
  tbody4.appendChild(makeNonRlRow());
  tbody4.appendChild(makeNonRlRow());

  return { rlHas, rlNo, nonRlHas, nonRlNo };
}
