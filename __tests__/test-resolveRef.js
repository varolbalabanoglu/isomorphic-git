/* eslint-env node, browser, jasmine */
const { makeFixture } = require('./__helpers__/FixtureFS.js')
const snapshots = require('./__snapshots__/test-resolveRef.js.snap')
const registerSnapshots = require('./__helpers__/jasmine-snapshots')
const { plugins, resolveRef } = require('isomorphic-git')

describe('resolveRef', () => {
  beforeAll(() => {
    registerSnapshots(snapshots)
  })
  it('1e40fdfba1cf17f3c9f9f3d6b392b1865e5147b9', async () => {
    // Setup
    let { fs, gitdir } = await makeFixture('test-resolveRef')
    plugins.set('fs', fs)
    // Test
    let ref = await resolveRef({
      gitdir,
      ref: '1e40fdfba1cf17f3c9f9f3d6b392b1865e5147b9'
    })
    expect(ref).toMatchSnapshot()
  })
  it('test-branch', async () => {
    // Setup
    let { fs, gitdir } = await makeFixture('test-resolveRef')
    plugins.set('fs', fs)
    // Test
    let ref = await resolveRef({
      gitdir,
      ref: 'origin/test-branch'
    })
    expect(ref).toMatchSnapshot()
  })
  it('test-tag', async () => {
    // Setup
    let { fs, gitdir } = await makeFixture('test-resolveRef')
    plugins.set('fs', fs)
    // Test
    let ref = await resolveRef({
      gitdir,
      ref: 'test-tag'
    })
    expect(ref).toMatchSnapshot()
  })
  it('HEAD', async () => {
    // Setup
    let { fs, gitdir } = await makeFixture('test-resolveRef')
    plugins.set('fs', fs)
    // Test
    let ref = await resolveRef({
      gitdir,
      ref: 'HEAD'
    })
    expect(ref).toMatchSnapshot()
  })
  it('HEAD depth', async () => {
    // Setup
    let { fs, gitdir } = await makeFixture('test-resolveRef')
    plugins.set('fs', fs)
    // Test
    let ref = await resolveRef({
      gitdir,
      ref: 'HEAD',
      depth: 2
    })
    expect(ref).toMatchSnapshot()
  })
  it('packed-refs', async () => {
    // Setup
    let { fs, gitdir } = await makeFixture('test-resolveRef')
    plugins.set('fs', fs)
    // Test
    let ref = await resolveRef({
      gitdir,
      ref: 'v0.0.1'
    })
    expect(ref).toMatchSnapshot()
  })
  it('non-existant refs', async () => {
    // Setup
    let { fs, gitdir } = await makeFixture('test-resolveRef')
    plugins.set('fs', fs)
    // Test
    let error = {}
    try {
      await resolveRef({
        gitdir,
        ref: 'this-is-not-a-ref'
      })
    } catch (err) {
      error = err
    }
    expect(error.message).toBeDefined()
    expect(error.caller).toEqual('git.resolveRef')
  })
})
