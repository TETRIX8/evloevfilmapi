
import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Documentation = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "API endpoint URL has been copied to clipboard.",
    });
  };

  const baseUrl = window.location.origin;
  const exampleUrl = `${baseUrl}/api/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&limit=100&genre=drama`;
  const baseApiUrl = "https://api.bhcesh.me";

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">API Mirror Gateway Documentation</h1>
      
      <div className="space-y-12">
        {/* Introduction */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Introduction</h2>
          <p className="mb-4">
            The API Mirror Gateway is a proxy service that allows you to make requests to external APIs through our domain.
            This can be useful for:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Bypassing CORS restrictions in frontend applications</li>
            <li>Masking the original API endpoint for added privacy</li>
            <li>Setting up a consistent API endpoint for your applications</li>
          </ul>
          <p>
            The gateway forwards all requests to the original API and returns the responses unchanged.
          </p>
        </section>
        
        {/* Base URL */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Base URL</h2>
          <p className="mb-4">
            All API requests should be made to the following base URL:
          </p>
          <div className="flex items-center gap-2 mb-4">
            <code className="api-endpoint flex-1">
              {baseUrl}/api
            </code>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => copyToClipboard(`${baseUrl}/api`)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            This will proxy requests to: <code className="px-1 py-0.5 bg-gray-100 rounded">{baseApiUrl}</code>
          </p>
        </section>
        
        {/* How to Use */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">How to Use</h2>
          <p className="mb-4">
            To use the API Mirror Gateway, replace the original API domain with our gateway's URL and keep all other parameters the same.
          </p>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">Example:</h3>
          
          <Tabs defaultValue="original">
            <TabsList className="mb-4">
              <TabsTrigger value="original">Original API</TabsTrigger>
              <TabsTrigger value="mirror">Mirror Gateway</TabsTrigger>
            </TabsList>
            <TabsContent value="original">
              <div className="code-block">
                <code>https://api.bhcesh.me/list?token=3794a7638b5863cc60d7b2b9274fa32e&type=serials&limit=100&genre=drama</code>
              </div>
            </TabsContent>
            <TabsContent value="mirror">
              <div className="flex flex-col gap-2">
                <div className="code-block">
                  <code>{exampleUrl}</code>
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => copyToClipboard(exampleUrl)}
                    className="flex items-center gap-1"
                  >
                    <Copy className="h-3 w-3" /> Copy URL
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Available Endpoints */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Available Endpoints</h2>
          <p className="mb-6">
            The API Mirror Gateway supports all endpoints available in the original API. Here are some common examples:
          </p>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-semibold mb-2">List Endpoint</h3>
              <code className="api-endpoint block mb-2">
                {baseUrl}/api/list?token=TOKEN&type=TYPE&limit=LIMIT&genre=GENRE
              </code>
              <p className="text-sm text-slate-600">
                Returns a list of items based on the specified type, limit, and genre.
              </p>
            </div>
            
            <div className="p-4 border rounded-md">
              <h3 className="font-semibold mb-2">Search Endpoint</h3>
              <code className="api-endpoint block mb-2">
                {baseUrl}/api/search?token=TOKEN&query=QUERY
              </code>
              <p className="text-sm text-slate-600">
                Searches for items that match the specified query.
              </p>
            </div>
            
            <div className="p-4 border rounded-md">
              <h3 className="font-semibold mb-2">Custom Endpoints</h3>
              <p className="text-sm text-slate-600">
                Any other endpoint available in the original API can be accessed by replacing the domain with our gateway URL.
              </p>
            </div>
          </div>
        </section>
        
        {/* Error Handling */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Error Handling</h2>
          <p className="mb-4">
            The API Mirror Gateway will return the same error responses as the original API. Common HTTP status codes include:
          </p>
          
          <div className="space-y-2">
            <div className="flex">
              <span className="w-16 font-mono font-medium">200</span>
              <span>Successful request</span>
            </div>
            <div className="flex">
              <span className="w-16 font-mono font-medium">400</span>
              <span>Bad request - check your parameters</span>
            </div>
            <div className="flex">
              <span className="w-16 font-mono font-medium">401</span>
              <span>Unauthorized - invalid token</span>
            </div>
            <div className="flex">
              <span className="w-16 font-mono font-medium">404</span>
              <span>Resource not found</span>
            </div>
            <div className="flex">
              <span className="w-16 font-mono font-medium">500</span>
              <span>Server error from the upstream API</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
