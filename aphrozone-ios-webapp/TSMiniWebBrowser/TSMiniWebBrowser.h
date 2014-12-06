

#import <UIKit/UIKit.h>

@protocol TSMiniWebBrowserDelegate <NSObject>
@optional
-(void) tsMiniWebBrowserDidDismiss;
@end

typedef enum {
	TSMiniWebBrowserModeNavigation,
	TSMiniWebBrowserModeModal,
    TSMiniWebBrowserModeTabBar,
} TSMiniWebBrowserMode;

@interface TSMiniWebBrowser : UIViewController <UIWebViewDelegate, UIActionSheetDelegate> {
    // URL
    NSURL *urlToLoad;
    
    // Layout
    UIWebView *webView;
    UIToolbar *toolBar;
    UINavigationBar *navigationBarModal; // Only used in modal mode
    
    // Toolbar items
    UIActivityIndicatorView *activityIndicator;
    UIBarButtonItem *buttonGoBack;
    UIBarButtonItem *buttonGoForward;
    
    // Customization
    TSMiniWebBrowserMode mode;
    BOOL showURLStringOnActionSheetTitle;
    BOOL showPageTitleOnTitleBar;
    BOOL showReloadButton;
    BOOL showActionButton;
    UIBarStyle barStyle;
	UIColor *barTintColor;
    NSString *modalDismissButtonTitle;
    NSString *forcedTitleBarText;
    
    // State control
    UIBarStyle originalBarStyle;
}

@property (assign) id<TSMiniWebBrowserDelegate> delegate;

@property (nonatomic, assign) TSMiniWebBrowserMode mode;
@property (nonatomic, assign) BOOL showURLStringOnActionSheetTitle;
@property (nonatomic, assign) BOOL showPageTitleOnTitleBar;
@property (nonatomic, assign) BOOL showReloadButton;
@property (nonatomic, assign) BOOL showActionButton;
@property (nonatomic, assign) UIBarStyle barStyle;
@property (nonatomic, strong) UIColor *barTintColor;
@property (nonatomic, strong) NSString *modalDismissButtonTitle;
@property (nonatomic, strong) NSString *domainLockList;
@property (nonatomic, strong) NSString *currentURL;

// Public Methods
- (id)initWithUrl:(NSURL*)url;
- (void)setFixedTitleBarText:(NSString*)newTitleBarText;
- (void)loadURL:(NSURL*)url;
@end
