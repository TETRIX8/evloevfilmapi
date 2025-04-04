
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Copy, ExternalLink, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ApiTester = () => {
  const { toast } = useToast();
  const [endpoint, setEndpoint] = useState('list');
  const [token, setToken] = useState('3794a7638b5863cc60d7b2b9274fa32e');
  const [params, setParams] = useState('type=serials&limit=100&genre=drama');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}/api/${endpoint}?token=${token}${params ? `&${params}` : ''}`;
  
  const handleTest = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(fullUrl);
      const data = await res.json();
      
      setResponse(JSON.stringify(data, null, 2));
      
      toast({
        title: "Request successful",
        description: "API request completed successfully.",
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred while making the request.');
      toast({
        variant: "destructive",
        title: "Request failed",
        description: err.message || 'An error occurred while making the request.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied to clipboard.",
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">API Request Tester</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Request builder */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Request Builder</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="endpoint">Endpoint</Label>
                <Input
                  id="endpoint"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  placeholder="e.g. list, search, etc."
                />
              </div>
              
              <div>
                <Label htmlFor="token">Token</Label>
                <Input
                  id="token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Your API token"
                />
              </div>
              
              <div>
                <Label htmlFor="params">Additional Parameters</Label>
                <Input
                  id="params"
                  value={params}
                  onChange={(e) => setParams(e.target.value)}
                  placeholder="e.g. type=serials&limit=100&genre=drama"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Format: param1=value1&param2=value2
                </p>
              </div>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Full Request URL</CardTitle>
              <CardDescription>
                This is the complete URL that will be used for your API request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 p-3 rounded-md font-mono text-sm break-all">
                {fullUrl}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => copyToClipboard(fullUrl)}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" /> Copy URL
              </Button>
              <Button 
                onClick={handleTest}
                disabled={loading}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4" /> Test API
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Common API Use Cases</h2>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setEndpoint('list');
                  setParams('type=serials&limit=100&genre=drama');
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2" /> 
                Get Drama Series List
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setEndpoint('list');
                  setParams('type=movies&limit=20&genre=action');
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2" /> 
                Get Action Movies List
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  setEndpoint('search');
                  setParams('query=avengers');
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2" /> 
                Search for "Avengers"
              </Button>
            </div>
          </div>
        </div>
        
        {/* Response viewer */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Response</h2>
              {response && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(response)}
                >
                  <Copy className="h-4 w-4 mr-1" /> Copy
                </Button>
              )}
            </div>
            
            <Tabs defaultValue="pretty" className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="pretty">Pretty</TabsTrigger>
                <TabsTrigger value="raw">Raw</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pretty">
                {error ? (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
                    <p className="font-semibold">Error</p>
                    <p>{error}</p>
                  </div>
                ) : loading ? (
                  <div className="h-96 flex items-center justify-center bg-slate-50 rounded-md">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                      <p>Loading response...</p>
                    </div>
                  </div>
                ) : response ? (
                  <pre className="bg-slate-800 text-white p-4 rounded-md overflow-auto h-96">
                    {response}
                  </pre>
                ) : (
                  <div className="h-96 flex items-center justify-center bg-slate-50 rounded-md">
                    <div className="text-center">
                      <p className="mb-2">Click "Test API" to see the response</p>
                      <PlayCircle className="mx-auto h-12 w-12 text-slate-400" />
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="raw">
                {error ? (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
                    <p>{error}</p>
                  </div>
                ) : loading ? (
                  <div className="h-96 flex items-center justify-center bg-slate-50 rounded-md">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                  </div>
                ) : response ? (
                  <div className="bg-slate-800 font-mono text-white p-4 rounded-md overflow-auto h-96">
                    <code>{response.replace(/\n\s*/g, '')}</code>
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center bg-slate-50 rounded-md">
                    <p className="text-slate-500">No response yet</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
              <ExternalLink className="h-4 w-4 mr-2" />
              Use in your application
            </h3>
            <p className="text-blue-800 mb-3">
              After testing your API request, you can use it in your application with the following code:
            </p>
            <div className="code-block mb-2">
              <code>{`
fetch("${fullUrl}")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
              `}</code>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-100"
              onClick={() => copyToClipboard(`
fetch("${fullUrl}")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
              `)}
            >
              <Copy className="h-4 w-4 mr-1" /> Copy Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTester;
