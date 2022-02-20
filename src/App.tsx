import { Input, Button, Select } from 'antd'
import Form from '@/components/Form'

function App() {
  return (
    <div className="App">
      <Button type='primary'>按钮</Button>

      <Form>
        <Form.Item name="keyValue">
          <Input.Group>
            <Input.Search
              addonBefore={(
                <Select
                  defaultValue="Zhejiang"
                  style={{ width: '120px' }}  
                >
                  <Select.Option value="Zhejiang">Zhejiang</Select.Option>
                  <Select.Option value="Jiangsu">Jiangsu</Select.Option>
                </Select>
              )}
              allowClear
              style={{ width: '370px' }}
            />
          </Input.Group>
        </Form.Item>
        <Form.Item name="searchKey">
          <Input.Search
            style={{ width: '330px' }}
            allowClear
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default App
