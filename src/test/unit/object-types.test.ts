import { describe, test } from 'node:test';
import * as assert from 'node:assert/strict';
import { detectObjectType, matchFileName, matchResourceFolder } from '../../object-types';
import type { ObjectIdents } from '../../structure-settings';

// Same values as the defaults in package.json.
const idents: ObjectIdents = {
  codeUnit: 'Codeunit',
  controlAddin: 'ControlAddin',
  dotNet: 'DotNet',
  entitlement: 'Entitlement',
  enum: 'Enum',
  enumExt: 'EnumExt',
  interface: 'Interface',
  page: 'Page',
  pageExt: 'PageExt',
  permissionSet: 'PermissionSet',
  permissionSetExt: 'PermissionSetExt',
  profile: 'Profile',
  query: 'Query',
  report: 'Report',
  reportExt: 'ReportExt',
  table: 'Table',
  tableExt: 'TableExt',
  xmlPort: 'XmlPort',
};

describe('matchFileName', () => {
  test('Prefix: picks the longest identifier (PageExt, not Page)', () => {
    assert.equal(matchFileName('PageExtCustomer.al', 'Prefix', idents)?.folderKey, 'pageext');
    assert.equal(matchFileName('PageCustomer.al', 'Prefix', idents)?.folderKey, 'page');
    assert.equal(matchFileName('TableExtItem.al', 'Prefix', idents)?.folderKey, 'tableext');
  });

  test('Suffix: matches the end of the file name', () => {
    assert.equal(matchFileName('CustomerTable.al', 'Suffix', idents)?.folderKey, 'table');
    assert.equal(matchFileName('CustomerTableExt.al', 'Suffix', idents)?.folderKey, 'tableext');
    assert.equal(matchFileName('SalesReportExt.al', 'Suffix', idents)?.folderKey, 'reportext');
  });

  test('permission sets can be .al or .xml files', () => {
    assert.equal(matchFileName('AppPermissionSet.xml', 'Suffix', idents)?.folderKey, 'permissionset');
    assert.equal(matchFileName('AppPermissionSet.al', 'Suffix', idents)?.folderKey, 'permissionset');
  });

  test('returns undefined for unknown files', () => {
    assert.equal(matchFileName('README.md', 'Suffix', idents), undefined);
    assert.equal(matchFileName('CustomerTable.txt', 'Suffix', idents), undefined);
  });
});

describe('detectObjectType', () => {
  test('ignores case, BOM, CRLF and leading spaces', () => {
    assert.equal(detectObjectType('\uFEFF// comment\r\n  Codeunit 50100 "My Codeunit"\r\n{', 15)?.folderKey, 'codeunit');
  });

  test('detects extension objects', () => {
    assert.equal(detectObjectType('reportextension 50100 MyExt extends "Sales Invoice"', 15)?.folderKey, 'reportext');
    assert.equal(detectObjectType('tableextension 50100 MyExt extends Customer', 15)?.folderKey, 'tableext');
    assert.equal(detectObjectType('permissionsetextension 50100 MyExt extends "D365 BASIC"', 15)?.folderKey, 'permissionsetext');
  });

  test('does not fail on files shorter than maxLines', () => {
    assert.equal(detectObjectType('', 15), undefined);
    assert.equal(detectObjectType('just one line', 15), undefined);
  });

  test('reads at most maxLines lines', () => {
    assert.equal(detectObjectType('\n\n\ntable 50100 MyTable', 2), undefined);
    assert.equal(detectObjectType('\n\n\ntable 50100 MyTable', 4)?.folderKey, 'table');
  });
});

describe('matchResourceFolder', () => {
  test('maps layouts, images and translations', () => {
    assert.equal(matchResourceFolder('Invoice.rdlc'), 'layout');
    assert.equal(matchResourceFolder('Invoice.docx'), 'layout');
    assert.equal(matchResourceFolder('logo.ICO'), 'logo');
    assert.equal(matchResourceFolder('MyApp.pt-PT.xlf'), 'translation');
    assert.equal(matchResourceFolder('Customer.al'), undefined);
  });
});
