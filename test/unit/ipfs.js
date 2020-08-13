  describe("#createFileModelServer", () => {
        await bchjs.IPFS.createFileModelServer(path)
      const result = await bchjs.IPFS.createFileModelServer(path)
  describe("#uploadFileServer", () => {
        await bchjs.IPFS.uploadFileServer(path)
        await bchjs.IPFS.uploadFileServer(path)
        await bchjs.IPFS.uploadFileServer(path, "5ec562319bfacc745e8d8a52")
        const result = await bchjs.IPFS.uploadFileServer(

  describe("#createFileModelWeb", () => {
    it("should throw an error if file is undefined", async () => {
      try {
        let file

        await bchjs.IPFS.createFileModelWeb(file)

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(`err.message: ${err.message}`)
        assert.include(err.message, `File is required`)
      }
    })
    it("should throw an error if file is empty", async () => {
      try {
        const file = {}

        await bchjs.IPFS.createFileModelWeb(file)

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(`err.message: ${err.message}`)
        assert.include(
          err.message,
          `File should have the property 'name' of string type`
        )
      }
    })
    it("should throw an error if 'name' property is not included", async () => {
      try {
        const file = {
          size: 5000
        }

        await bchjs.IPFS.createFileModelWeb(file)

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(`err.message: ${err.message}`)
        assert.include(
          err.message,
          `File should have the property 'name' of string type`
        )
      }
    })

    it("should throw an error if 'size' property is not included", async () => {
      try {
        const file = {
          name: "ipfs.js"
        }

        await bchjs.IPFS.createFileModelWeb(file)

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(`err.message: ${err.message}`)
        assert.include(
          err.message,
          `File should have the property 'size' of number type`
        )
      }
    })

    it("should create a new file model", async () => {
      const file = {
        name: "ipfs.js",
        size: 5000,
        type: "text/plain"
      }
      sandbox
        .stub(bchjs.IPFS.axios, "post")
        .resolves({ data: mockData.mockNewFileModel })

      const result = await bchjs.IPFS.createFileModelWeb(file)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result, "success")
      assert.equal(result.success, true)

      assert.property(result, "hostingCostBCH")
      assert.property(result, "hostingCostUSD")
      assert.property(result, "file")

      assert.property(result.file, "payloadLink")
      assert.property(result.file, "hasBeenPaid")
      assert.property(result.file, "_id")
      assert.property(result.file, "schemaVersion")
      assert.property(result.file, "size")
      assert.property(result.file, "fileName")
      assert.property(result.file, "fileExtension")
      assert.property(result.file, "createdTimestamp")
      assert.property(result.file, "hostingCost")
      assert.property(result.file, "walletIndex")
      assert.property(result.file, "bchAddr")
    })
  })

  describe("#uploadFileWeb", () => {
    it("should throw an error if file is undefined", async () => {
      try {
        let file

        await bchjs.IPFS.uploadFileWeb(file)

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(`err.message: ${err.message}`)
        assert.include(err.message, `File is required`)
      }
    })
    it("should throw an error if file is empty", async () => {
      try {
        const file = {}

        await bchjs.IPFS.uploadFileWeb(file)

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(`err.message: ${err.message}`)
        assert.include(
          err.message,
          `File should have the property 'name' of string type`
        )
      }
    })
    it("should throw an error if 'name' property is not included", async () => {
      try {
        const file = {
          size: 5000,
          type: "text/plain"
        }

        await bchjs.IPFS.uploadFileWeb(file)

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(`err.message: ${err.message}`)
        assert.include(
          err.message,
          `File should have the property 'name' of string type`
        )
      }
    })
    it("should throw an error if 'size' property is not included", async () => {
      try {
        const file = {
          name: "ipfs.js",
          type: "text/plain"
        }

        await bchjs.IPFS.uploadFileWeb(file)

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(`err.message: ${err.message}`)
        assert.include(
          err.message,
          `File should have the property 'size' of number type`
        )
      }
    })
    it("should throw an error if 'type' property is not included", async () => {
      try {
        const file = {
          name: "ipfs.js",
          size: 5000
        }

        await bchjs.IPFS.uploadFileWeb(file)

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(`err.message: ${err.message}`)
        assert.include(
          err.message,
          `File should have the property 'type' of string type`
        )
      }
    })
    it("should throw an error if modelId is not included", async () => {
      try {
        const file = {
          name: "ipfs.js",
          size: 5000,
          type: "text/plain"
        }
        await bchjs.IPFS.uploadFileWeb(file)

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(`err.message: ${err.message}`)
        assert.include(err.message, `Must include a file model ID`)
      }
    })

    it("Should throw error if the file was not uploaded", async () => {
      try {
        const mock = {
          successful: [],
          failed: [
            {
              id: "file id"
            }
          ]
        }
        sandbox.stub(bchjs.IPFS.uppy, "upload").resolves(mock)

        const file = {
          name: "ipfs.js",
          size: 5000,
          type: "text/plain"
        }
        await bchjs.IPFS.uploadFileWeb(file, "5ec562319bfacc745e8d8a52")

        assert.equal(true, false, "Unexpected result")
      } catch (err) {
        //console.log(err)
        assert.include(err.message, `The file could not be uploaded`)
      }
    })

    it("should return file object if the file is uploaded", async () => {
      try {
        sandbox.stub(bchjs.IPFS.uppy, "upload").resolves(mockData.uploadData)

        const file = {
          name: "ipfs.js",
          size: 5000,
          type: "text/plain"
        }
        const result = await bchjs.IPFS.uploadFileWeb(
          file,
          "5ec562319bfacc745e8d8a52"
        )
        // console.log(`result: ${JSON.stringify(result, null, 2)}`)

        assert.property(result, "schemaVersion")
        assert.property(result, "size")
        assert.property(result, "fileId")
        assert.property(result, "fileName")
        assert.property(result, "fileExtension")
      } catch (err) {
        //console.log(err)
        assert.equal(true, false, "Unexpected result")
      }
    })
  })